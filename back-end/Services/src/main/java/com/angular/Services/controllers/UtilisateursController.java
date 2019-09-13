package com.angular.Services.controllers;

import com.angular.Services.Repositories.IUtilisateurs;
import com.angular.Services.entities.utilisateurs;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Optional;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UtilisateursController{

    @Autowired
    private IUtilisateurs usersRepo;
    @GetMapping("/")
    public ResponseEntity GetUtilisateurs() {

        return ResponseEntity.ok(usersRepo.findAll());
    }

    @GetMapping("/{idUser}")
    public ResponseEntity GetUtilisateur(@PathVariable(name = "idUser") Long idUser) {
        if (idUser == null) {
            return ResponseEntity.badRequest().body("entrer un id utilisateur");
        }
        utilisateurs user = usersRepo.getOne(idUser);
        if (user == null) {
            ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/")
    public ResponseEntity createUser (@RequestPart(required=false,name="photo")MultipartFile photo,@RequestPart(name="user")String struser) throws IOException {
        utilisateurs userr = new ObjectMapper().readValue(struser, utilisateurs.class);
        userr.setPhoto(photo.getBytes());
        utilisateurs createdUser = usersRepo.save(userr);
        return ResponseEntity.ok().body(createdUser);
    }

    @DeleteMapping("/delete/{idUser}")
    public ResponseEntity deleteUser(@PathVariable(name = "idUser") Long idUser) {
        if (idUser == null) {
            return ResponseEntity.badRequest().body("il faut entrer un id utilisateur");
        }
        utilisateurs user = usersRepo.getOne(idUser);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        usersRepo.delete(user);
        return ResponseEntity.ok().body("utilisateur a été supprimé avec sucées");
    }
    @PostMapping("/login")
    public ResponseEntity login(@RequestParam(name = "login") String login, @RequestParam(name = "password") String password) {
        if (StringUtils.isEmpty(login) || StringUtils.isEmpty(password)) {
            return ResponseEntity.badRequest().body("Cannot login with empty user mail or password");
        }

        utilisateurs authenticatedUser = usersRepo.findByLoginAndPassword(login, password);
        if (authenticatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(authenticatedUser);
    }
    @PutMapping("/edit/{idUser}")
    public ResponseEntity updateUserupdatePostt(@PathVariable("idUser") Long idUser,@RequestPart(required=false,name="photo") MultipartFile photo,@RequestPart(name="user")String struser) throws IOException {

        utilisateurs user = new ObjectMapper().readValue(struser, utilisateurs.class);
        Optional<utilisateurs> postOptional=usersRepo.findById(idUser);
        utilisateurs p1=postOptional.get();
        if(user.getGender()!=null)
            p1.setGender(user.getGender());
        if(user.getNom()!=null)
            p1.setNom(user.getNom());
        if(user.getPrenom()!=null)
            p1.setPrenom(user.getPrenom());
        if(user.getDate_naissance()!=null)
        p1.setDate_naissance(user.getDate_naissance());
        if(user.getRole()!=null)
            p1.setRole(user.getRole());
        if(user.getLogin()!=null)
            p1.setLogin(user.getLogin());
        if(user.getPassword()!=null)
            p1.setPassword(user.getPassword());
        if(photo !=null)
            p1.setPhoto(photo.getBytes());
         utilisateurs updatedUser = usersRepo.save(p1);
        return ResponseEntity.ok().body(updatedUser);
    }

    @GetMapping("/photoP/{idUser}")
    public  byte[] photoPost(@PathVariable("idUser") Long idUser, HttpServletRequest request) {
        Optional<utilisateurs> p = usersRepo.findById(idUser);
        utilisateurs p1 = p.get();
        try {
            if (p1.getPhoto() == null) {
                return null;
            }
            return IOUtils.toByteArray(new ByteArrayInputStream(p1.getPhoto()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
