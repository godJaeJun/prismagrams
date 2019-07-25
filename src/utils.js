import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname,".env")});
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";
// 비밀값 생성 함수
export const generateSecret = () => {
   const randomNumber = Math.floor(Math.random() * adjectives.length);
   return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

// 메일 관련 함수
const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME ,
            api_key:process.env.SENDGRID_PASSWORD
        }
    }
    
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

// from은 nico@prismagram.com으로 to는 address, subject는 Login Secret for prismagram으로 email객체를 만듬
export const sendSecretMail = (address, secret) =>{
   const email ={
    from: "JJL@prismagram.com",
    to: address,
    subject: "Login Secret for Prismagram",
    html: `안녕하세요! 회원님의 비밀코드는 <b>${secret}</b> 입니다.<br>로그인 하기 위해서는 앱 or 웹에 복사 붙여넣기 해주십시오.`
   };

   return sendMail(email);
}

//JWT토큰 생성
export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);