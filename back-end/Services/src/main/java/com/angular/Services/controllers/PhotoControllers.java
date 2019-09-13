package com.angular.Services.controllers;

import com.angular.Services.Repositories.IUtilisateurs;
import com.angular.Services.entities.utilisateurs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/users")
public class PhotoControllers {
    @Autowired
    private IUtilisateurs userRepo;

    @GetMapping("/photo/{idUser}")

    public ResponseEntity photoUser(@PathVariable Long idUser) {

        if (idUser == null) {
            return ResponseEntity.badRequest().body("Cannot get user photo with null ID");
        }

        utilisateurs user = userRepo.getOne(idUser);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        if (user.getPhoto() == null) {
           return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_GIF)
                .contentType(MediaType.IMAGE_JPEG)
                .contentType(MediaType.IMAGE_PNG)
                .body(new InputStreamResource(new ByteArrayInputStream(user.getPhoto())));
    }
}

