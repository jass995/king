
const form         = document.getElementById('registration-form');
const errorSummary = document.getElementById('error-summary');
const errorList    = document.getElementById('error-list');
const errorCount   = document.getElementById('error-count');
const successBox   = document.getElementById('success-message');

// Regex de validation d'email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Affiche une erreur sous un champ + contour rouge
function showError(field, message) {
  field.classList.add('field-error');

  // Évite les doublons de tooltip
  const next = field.nextElementSibling;
  if (next && next.classList.contains('error-tooltip')) next.remove();

  const tip = document.createElement('span');
  tip.className = 'error-tooltip';
  tip.textContent = message;
  field.insertAdjacentElement('afterend', tip);
}

// ── Nettoie l'erreur d'un champ
function clearError(field) {
  field.classList.remove('field-error');
  const next = field.nextElementSibling;
  if (next && next.classList.contains('error-tooltip')) next.remove();
}

// ── Nettoie toutes les erreurs avant chaque soumission
function clearAllErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
  document.querySelectorAll('.error-tooltip').forEach(el => el.remove());
  errorList.innerHTML = '';
  errorSummary.hidden = true;
}

// ── Soumission du formulaire
form.addEventListener('submit', function (e) {
  e.preventDefault();
  clearAllErrors();
  successBox.hidden = true;

  const errors = [];

  // ---- 1. Nom complet ----
  const fullname = document.getElementById('fullname');
  if (fullname.value.trim() === '') {
    showError(fullname, 'Le nom est obligatoire.');
    errors.push('Nom complet manquant');
  } else if (fullname.value.trim().length < 3) {
    showError(fullname, 'Au moins 3 caractères requis.');
    errors.push('Nom trop court');
  }

  // ---- 2. Email ----
  const email = document.getElementById('email');
  if (email.value.trim() === '') {
    showError(email, "L'email est obligatoire.");
    errors.push('Email manquant');
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, "Format d'email invalide.");
    errors.push('Email invalide');
  }

  // ---- 3. Âge (minimum 18, maximum 120) ----
  const age = document.getElementById('age');
  const ageVal = parseInt(age.value, 10);
  if (age.value === '' || isNaN(ageVal)) {
    showError(age, 'Veuillez entrer votre âge.');
    errors.push('Âge manquant');
  } else if (ageVal < 18) {
    showError(age, 'Vous devez avoir au moins 18 ans.');
    errors.push('Âge inférieur à 18 ans');
  } else if (ageVal > 120) {
    showError(age, 'Âge non valide.');
    errors.push('Âge invalide');
  }

  // ---- 4. Type de billet ----
  const ticket = document.getElementById('ticket');
  if (ticket.value === '') {
    showError(ticket, 'Choisissez un type de billet.');
    errors.push('Billet non sélectionné');
  }

  // ---- 5. Quantité (minimum 1) ----
  const quantity = document.getElementById('quantity');
  const qVal = parseInt(quantity.value, 10);
  if (quantity.value === '' || isNaN(qVal)) {
    showError(quantity, 'Indiquez une quantité.');
    errors.push('Quantité manquante');
  } else if (qVal <= 0) {
    showError(quantity, 'La quantité doit être au moins 1.');
    errors.push('Quantité invalide');
  }

  // ---- 6. Jours (au moins une checkbox cochée) ----
  const days = document.querySelectorAll('input[name="days"]:checked');
  if (days.length === 0) {
    const firstDay = document.querySelector('input[name="days"]');
    showError(firstDay.parentElement, 'Sélectionnez au moins un jour.');
    errors.push('Aucun jour sélectionné');
  }

  // ---- 7. Écurie favorite (radio) — corrigé : name="team" ----
  const team = document.querySelector('input[name="team"]:checked');
  if (!team) {
    const firstRadio = document.querySelector('input[name="team"]');
    showError(firstRadio.parentElement, 'Choisissez votre écurie favorite.');
    errors.push('Écurie non sélectionnée');
  }

  // ---- 8. Message ----
  const message = document.getElementById('message');
  if (message.value.trim() === '') {
    showError(message, 'Ce champ est obligatoire.');
    errors.push('Message manquant');
  }

  // ---- 9. CGU ----
  const cgu = document.getElementById('cgu');
  if (!cgu.checked) {
    showError(cgu.parentElement, 'Vous devez accepter les CGU.');
    errors.push('CGU non acceptées');
  }

  // ── Affichage du panneau résumé ou du succès
  if (errors.length > 0) {
    errorCount.textContent = errors.length;
    errors.forEach(err => {
      const li = document.createElement('li');
      li.textContent = err;
      errorList.appendChild(li);
    });
    errorSummary.hidden = false;
    errorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    successBox.hidden = false;
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.reset();
  }
});

// ── Nettoyage en temps réel quand l'utilisateur corrige un champ
form.addEventListener('input', (e) => {
  if (e.target.classList.contains('field-error')) clearError(e.target);
});
form.addEventListener('change', (e) => {
  if (e.target.classList.contains('field-error')) clearError(e.target);
});
