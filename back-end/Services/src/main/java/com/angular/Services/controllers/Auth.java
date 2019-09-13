package com.angular.Services.controllers;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;

import static com.angular.Services.ServicesANCE.ServiceSignatureTest.disableCertificateValidation;

@CrossOrigin(origins = "*", maxAge = 3600)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@RestController
@RequestMapping("/services")
public class Auth {
    @GetMapping("/Auth")

    public ResponseEntity doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long tempsDebut,tempsFin;
        double seconds =0.0;
        // TODO Auto-generated method stub
        try {
            disableCertificateValidation();
            String email = request.getParameter("email");
            String pwd = request.getParameter("pwd");

            URL url = new URL("https://193.95.63.244:8443/tunsign-proxy-webapp/services/rest/tunsign-proxy/userAuthentication/" + email);
            //URL url = new URL("https://193.95.63.244:8443/tunsign-proxy-webapp/services/rest/tunsign-proxy/get-otp-auth/"+email);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            tempsDebut =  System.currentTimeMillis();
            connection.setConnectTimeout(10000);
            connection.setRequestMethod("POST");
            connection.addRequestProperty("Accept", "*/*");
            connection.setRequestProperty("Content-Type", "application/json"); // We send our data in JSON format

            // Send data
            connection.setDoOutput(true);
            OutputStream os = connection.getOutputStream();

            byte[] input = pwd.getBytes();
            os.write(input);
            tempsFin = System.currentTimeMillis();
            seconds = ((tempsFin - tempsDebut) / 1000F);
            if (connection.getResponseCode() == 200) {

                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String sessionId = reader.readLine();
                reader.close();
                HttpSession session = request.getSession(true);
                session.setAttribute("sessionId", sessionId);
                //session.setAttribute("email", email);
                response.sendRedirect("otpInterface.jsp");

              return ResponseEntity.ok().body("ok" +" "+Double.toString(seconds));}
            else
                return ResponseEntity.badRequest().body("Email et/ou mot de passe incorrect(s)"+" "+Double.toString(seconds));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getStackTrace()+"secondes"+" "+Double.toString(seconds));
        }

    }}



