/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';

interface DecodeToken {
  email: string;
  email_verified: string;
  sub: string;
}

const App: React.FC = () => {
  const handleSignInApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log(appleAuthRequestResponse);

    if (appleAuthRequestResponse?.identityToken) {
      const {email, email_verified, sub} = jwt_decode<DecodeToken>(
        appleAuthRequestResponse.identityToken,
      );
    }
  };

  useEffect(() => {
    return appleAuth.onCredentialRevoked(async () => {
      console.log('Authorization revoked');
      //signOut()
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {(appleAuthAndroid.isSupported || Platform.OS === 'ios') && (
        <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          onPress={handleSignInApple}
          style={styles.button}
        />
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  button: {
    width: '100%',
    height: 45,
  },
});
