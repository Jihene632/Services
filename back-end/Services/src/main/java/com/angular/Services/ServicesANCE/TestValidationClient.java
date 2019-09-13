package com.angular.Services.ServicesANCE;



import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.sun.org.apache.xerces.internal.impl.dv.util.HexBin;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


/**
 * @author Mehrez
 *
 */

public class TestValidationClient {

    public static String readmsg(String msgfinalee) throws UnsupportedEncodingException{
        String encodemsg="";
        int size = msgfinalee.length();

        System.out.println("la taille de message est:"+size);
        int i=0 ;
        while(i<size)
        {
            String ID =msgfinalee.substring(i, i+4);

            byte[] bytess = HexBin.decode(ID); // decode mSG with no error but when some issues are he you must sign on this

            String ID2=(new String(bytess, "UTF-8"));
            System.out.println("ID:"+ID2);

            encodemsg+=(new String(bytess, "UTF-8"))+" ";

            i=i+4;

            String taill = msgfinalee.substring(i,i+2);

            int tailfi =Integer.parseInt(taill,16)*2;
            System.out.println("la taille de champ:"+tailfi);

            encodemsg+=tailfi+" ";
            i=i+2;
            String msgchamp = msgfinalee.substring(i, i+tailfi);

            i=i+tailfi;
            if(ID2.equals("B7"))
            {
                int  msgdate= Integer.parseInt(msgchamp,16);
                encodemsg+=msgdate+" ";
                System.out.println("la  champ:"+msgdate);
            }
            else{
                byte[] bytesss = HexBin.decode(msgchamp); // decode mSG
                System.out.println("champ:"+new String(bytesss,"UTF-8" ));

                encodemsg+=(new String(bytesss, "UTF-8"))+" ";

            }
        }

        return  encodemsg;
    }

   }