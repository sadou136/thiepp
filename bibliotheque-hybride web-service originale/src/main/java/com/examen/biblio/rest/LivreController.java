package com.examen.biblio.rest;

import com.examen.biblio.model.Livre;
import com.examen.biblio.repository.LivreRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livres")
public class LivreController {

    private final LivreRepository livreRepository;

    public LivreController(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }

    @GetMapping
    public List<Livre> getAllLivres() {
        return livreRepository.findAll();
    }

    @GetMapping("/{id}")
    public Livre getLivreById(@PathVariable Long id) {
        return livreRepository.findById(id).orElse(null);
    }

    @GetMapping("/disponibles")
    public List<Livre> getLivresDisponibles() {
        return livreRepository.findByDisponibleTrue();
    }
    
    @PutMapping("/{id}")
    public Livre updateLivre(@PathVariable Long id, @RequestBody Livre livre) {
        Livre existant = livreRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Livre non trouvé"));

        existant.setTitre(livre.getTitre());
        existant.setAuteur(livre.getAuteur());
        existant.setDisponible(livre.isDisponible());

        return livreRepository.save(existant);
    }
    
    @DeleteMapping("/{id}")
    public void deleteLivre(@PathVariable Long id) {
        livreRepository.deleteById(id);
    }

}
