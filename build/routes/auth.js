"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserModel_1 = require("../models/UserModel");
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
// read env vars
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Cognito
// user pool params obtained from AWS console
const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID,
};
const authRouter = (0, express_1.Router)();
// call cognito provider according to most updated docs
const client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: 'us-east-1' });
authRouter.post('/createuser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Signup command  for creating a new user
    const command = new client_cognito_identity_provider_1.SignUpCommand({
        ClientId: poolData.ClientId,
        Username: email,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
    });
    const createUserInPool = yield client
        .send(command)
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(500).json(`You had an error : ${error}`));
    return createUserInPool;
}));
authRouter.post('/confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        // Confirmar el registro del usuario en Cognito
        const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand({
            ClientId: poolData.ClientId,
            Username: email,
            ConfirmationCode: code,
        });
        // enviar confirmacion
        yield client.send(command);
        // Crear usuario en base de datos
        const newUser = new UserModel_1.User({ email });
        yield newUser.save();
        res.status(200).json({
            message: `User confirmed and created in the database:${newUser}`,
        });
    }
    catch (error) {
        // Manejar errores
        console.error('Error confirming user:', error);
        res.status(500).json({ error: 'Error confirming user.' });
    }
}));
authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH', // enable this authflow on your aws account
        AuthParameters: {
            PASSWORD: password,
            USERNAME: email,
        },
        ClientId: poolData.ClientId,
    });
    const userLogin = yield client
        .send(command)
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(500).json(`You had an error : ${error}`));
    // For simple communication use the "Idtoken"  which contains useful dat alike username(email)
    return userLogin;
}));
exports.default = authRouter;
