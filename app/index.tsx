import { Link } from "expo-router";
import { Text, View } from "react-native";



export default function index() {
    return (
        <View>
            <Link href={"/random/guess"}>
                <Text>
                    Go to random
                </Text> 
            </Link>
            <Link href={"/TodoScreen/todo"}>
                <Text>
                    Go to todo
                </Text>        
            </Link>
            <Link href={"/pathcamera/camera"}>
                <Text>
                    Go to camera
                </Text> 
            </Link>
        </View>
    );
}