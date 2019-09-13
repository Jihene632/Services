package com.angular.Services.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;

import static com.angular.Services.ServicesANCE.TestValidationClient.readmsg;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/services")
public class TestValidationController {


    @GetMapping("/TestValidation")
    public ResponseEntity getResponseTest() {
        long tempsDebut,tempsFin;
        double seconds =0.0;



        final String US = Character.toString((char) 31);
        //String string = "DC04TN0100071A5E1A5E0501TN3531043230313835320A32342F30362F3230313835330CD8A7D984D8A2D8AFD8A7D8A8353406313134373330353526D987D8AFD9892020D8B4D987D98AD8A8D98A202020202020202020202020202020202020202035360A32332F30322F32303030353718D8A7D984D988D8B3D984D8A7D8AAD98AD8A9202020202020353810D8A7D984D982D98AD8B1D988D8A7D9863539014136300AD985D8AAD988D8B3D8B777ONZ2UBXDQS2PN6TKRBQUVCQ7L7AJRSXDXOQ6A5KS2SGTLQR2LXRFWRK4MDN75J57KMUUR7W44XTAZTFD4ZSUYKDX4K3PRZQICE2SY";
        //String string = "JustFor00000Test3Y4KXLXC3PEVOA7T6T4UDRYYH3KKYJ4GOWVHC4C73AK5M5MWM264OPUPC5VR4XP2XTYUBTVJXUJBLTEFC27F4ARLXPT6L7WOL42ARJI=";
        String string3 = "DC04TN0100071BD91BD9M501TN";
        String string = "3531043230313735320A32312F30362F323031393533" +
                "1BD8B9D984D988D98520D8A7D984D8A5D8B9D984D8A7D985D98AD8A9353406313336373137353526" +
                "D985D8B1D8A7D8AF2020D8B2D8B1D984D98A20202020202020202020202020202020202020203536" +
                "0A33312D30372D31393938353713D8AAD988D986D8B320202020202020202020204D4C0530372C38" +
                "374D570530322C35304D330530382C35304D4E0530332C32354D490530312C30304D310530312C32" +
                "354D430530372C36324D360530392C35304D320530362C30304D510531382C37384D550530372C35" +
                "304D370530362C323035390152363053D988D8AAD8A8D8B9D8A720D984D8B0D984D98320D8AAD985" +
                "20D8A7D984D8AAD8B5D8B1D98AD8AD20D8A8D8B9D8AFD98520D986D8ACD8A7D8AD20D8A7D984D985" +
                "D8B9D986D98A20D8A8D8A7D984D8A3D985D8B1";

        String string2 = "OGOIKQGZJBXVSK6CZVHOBOHMA423JQTMQCMC" +
                "6FANBRDR7JHQAB2FXQP3VQURGLF2OKP7DJKI253Z5OABMTOZLM74TS36DDA4EA74DII";


        try {
            readmsg(string);
        } catch (UnsupportedEncodingException e2) {
            // TODO Auto-generated catch block
            e2.printStackTrace();
        }


        Boolean resultat = false;

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("value", string3 + string + US + string2);
        } catch (JSONException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        System.out.println(jsonObject);

        try {
            //adresse locale
            URL url = new URL("http://197.5.152.172:8080/test/rest/ValidationService/validateSignature");
            System.out.println(url);
            //adresse publique
            //URL url = new URL("http://193.95.63.235:8080/test/rest/ValidationService/validateSignature");
            //URL url = new URL("http://auth-cev.certification.tn:8080/test/rest/ValidationService/validateSignature");

            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            tempsDebut = System.currentTimeMillis();
            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);
            connection.setRequestMethod("POST");
            OutputStreamWriter out = new OutputStreamWriter(
                    connection.getOutputStream()); // out.write(jsonObject.toString());
            out.write(jsonObject.toString());

            out.close();
            int statusCode = connection.getResponseCode();
            if (connection.getResponseCode() == 200) {

                System.out.println("ok");
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line = "";
                while ((line = in.readLine()) != null) {
                    System.out.println(line);
                    JSONObject jsonObj = new JSONObject(line);
                    resultat = jsonObj.getBoolean("result");
                    tempsFin =System.currentTimeMillis();
                    seconds = ((tempsFin - tempsDebut) / 1000F);



                }in.close();
                return ResponseEntity.ok().body("service invoked successfully"+resultat+" "+"temps de réponse est"+" "+seconds);


            } else
                return ResponseEntity.badRequest().body("connection failed"+" "+seconds);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error while calling Rest services"+e.getStackTrace());

        }

    }

}