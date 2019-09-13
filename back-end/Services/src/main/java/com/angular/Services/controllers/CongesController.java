package com.angular.Services.controllers;


import com.angular.Services.Repositories.IConges;
import com.angular.Services.Repositories.IPersonnel;
import com.angular.Services.entities.Conges;
import com.angular.Services.entities.Personnels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/Conges")
public class CongesController {
    @Autowired
    IConges congesReppo;
    @Autowired
    IPersonnel PersoRepo;
    @PostMapping("/")
    public ResponseEntity AjouterConges(@RequestBody Conges con) {
        if (con == null) {
            return ResponseEntity.badRequest().body("cannot add empty conges");
        }
        Conges c = congesReppo.save(con);
        return  ResponseEntity.ok().body(c);

    }
    @GetMapping("/{idConges}")
    public ResponseEntity getCongesByid(@PathVariable(name="idConges") Long idConges){
        if (idConges==null){
            return  ResponseEntity.badRequest().body("cannot find conges with id null");
        }
        Conges c=congesReppo.getOne(idConges);
        if (c==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(c);

    }
    @GetMapping("/")
    public ResponseEntity getConges(){
        return ResponseEntity.ok().body(congesReppo.findAll());

    }


    @GetMapping("/all/{idPersonnel}")
    public ResponseEntity findAllPersonnelConges(@PathVariable Long idPersonnel) {
        //ntesti si id personnel null nraja3 bad request
        if (idPersonnel == null) {
            return ResponseEntity.badRequest().body("Cannot find conges with null personnel");
        }

        Personnels p = PersoRepo.getOne(idPersonnel);
        if (p == null) {
            return ResponseEntity.notFound().build();
        }


        List<Conges> userChars = congesReppo.findByPersonnel(p);


        return ResponseEntity.ok(userChars);
    }
    @PutMapping("/edit/{idConges}")
    public  ResponseEntity updatePersonnel (@RequestBody Conges con,@PathVariable("idConges") Long idConges) {
        Optional<Conges> PersoOptional=congesReppo.findById(idConges);
          if (!PersoOptional.isPresent())
              return  ResponseEntity.notFound().build() ;

        con.setIdConges(idConges);

        Conges c = congesReppo.save(con);
        return ResponseEntity.ok().body(c);


    }
    @DeleteMapping("/delete/{idConges}")
    public ResponseEntity deletePersonnel(@PathVariable(name="idConges") Long idConges){
        if (idConges==null){
            return ResponseEntity.badRequest().body("entrer un id conges");
        }
        Conges c=congesReppo.getOne(idConges);
        if (c==null){
            return ResponseEntity.notFound().build();
        }
       congesReppo.delete(c);
        return ResponseEntity.ok().body("le conges a été bien supprimé") ;
    }




}
