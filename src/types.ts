export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Stock: undefined;
    UserList: undefined;
    UserRegistration: undefined;
    MovementRegistration: undefined;
    MovementList: undefined;
    MovementListForDriver: undefined;
    MapScreen: {
        origin: {
            latitude: number;
            longitude: number;
        };
        destination: {
            latitude: number;
            longitude: number;
        };
    };
};