import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Tabs} from 'expo-router';

export default function TabLayout(){
    return(
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: true
        }}
        >
            <Tabs.Screen
            //In here, give the relevent tab name, for example, index or profile
            options={{
                // give a title as 'Dashbord'
                tabBarIcon:({color}) => (
                    <MaterialCommunityIcons name="view-dashboard" size={24} color={typeof color == 'string' ? color:'blue'} />
                )
            }} />
        </Tabs>
    );
}