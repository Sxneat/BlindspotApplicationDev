import * as ort from "onnxruntime-react-native";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';
import { runOnJS } from "react-native-reanimated";
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";

let session: ort.InferenceSession | null = null;

async function loadModel() {
  session = await ort.InferenceSession.create("yolo11n.onnx");
  console.log("ONNX model loaded!");
}
loadModel();

async function detectObjects(frame: any) {
  if (!session) return;
  // TODO: convert frame -> tensor -> run session.run() -> parse outputs
  console.log("Frame received for inference");
}


function NoCameraErrorView() {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="No Camera" onPress={() => {}} />
    </View>
}

export default function Camerapage() {
  const device = useCameraDevice('back') 
  const { hasPermission, requestPermission } = useCameraPermission()
  
  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    runOnJS(detectObjects)(frame);
  }, []);
  
  useEffect(() => {
    // Request camera permission if not granted
    if (!hasPermission) {
      requestPermission();
    }
    
  }, [hasPermission, requestPermission]);


  if (!hasPermission) {
    return <View> 
      <Button
        title={"Allow Camera"}
        onPress={requestPermission}
      />
    </View>
  };

  if (device == null) {
    return (
      <View style={styles.centered}>
        <Text>No Camera</Text>
      </View>
    );
  }

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}              
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});