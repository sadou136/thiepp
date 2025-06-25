package com.examen.biblio.rest;

import com.examen.biblio.model.Livre;
import com.examen.biblio.model.Reservation;
import com.examen.biblio.repository.LivreRepository;
import com.examen.biblio.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final LivreRepository livreRepository;

    public ReservationController(ReservationRepository reservationRepository, LivreRepository livreRepository) {
        this.reservationRepository = reservationRepository;
        this.livreRepository = livreRepository;
    }

    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable Long id) {
        return reservationRepository.findById(id).orElse(null);
    }

    @PostMapping
    public String reserverLivre(@RequestBody ReservationRequest request) {
        Optional<Livre> optionalLivre = livreRepository.findById(request.getLivreId());

        if (optionalLivre.isEmpty()) {
            return "Livre non trouvé.";
        }

        Livre livre = optionalLivre.get();

        if (!livre.isDisponible()) {
            return "Ce livre n'est pas disponible pour réservation.";
        }

        Reservation reservation = new Reservation();
        reservation.setLivre(livre);
        reservation.setUtilisateur(request.getUtilisateur());
        reservation.setDateDebut(request.getDateDebut());
        reservation.setDateFin(request.getDateFin());

        // Mise à jour du statut de disponibilité du livre
        livre.setDisponible(false);

        // Sauvegarde
        reservationRepository.save(reservation);
        livreRepository.save(livre);

        return "Réservation effectuée avec succès.";
    }
}
