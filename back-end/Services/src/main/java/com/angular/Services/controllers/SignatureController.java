package com.angular.Services.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.net.ssl.HttpsURLConnection;
import java.io.OutputStream;
import java.net.URL;

import static com.angular.Services.ServicesANCE.ServiceSignatureTest.disableCertificateValidation;


/**
 * @author Mehrez
 *
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/services")
public  class SignatureController {
    @GetMapping("/signatureTest")

    public ResponseEntity getResponseSignature() {
        long tempsDebut,tempsFin;
        double seconds =0.0;

        try {

            disableCertificateValidation();
            String email = "hachem.bouhlel@certification.tn";
            String pwd = "042970";

            URL url = new URL("https://193.95.63.244:8443/tunsign-proxy-webapp/services/rest/tunsign-proxy/get-otp-auth/" + email);
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

                return ResponseEntity.ok().body("OK"+" "+Double.toString(seconds));
            } else
                return ResponseEntity.badRequest().body("email et /ou mot de passe incorrect(s)"+" "+Double.toString(seconds));


        } catch (Exception e) {
            // TODO Auto-generated catch block
            return ResponseEntity.badRequest().body(e.getStackTrace());
        }


    }}

