import { createHeader } from './Header.ts';
import { createAboutSection } from './About.ts';
import { createExperienceSection } from './Experience.ts';
import { createContactSection } from './Contact.ts';
import { createButtons } from './Buttons.ts';
import { selectElement } from '../utils/domUtils.ts';

export function initializeCard(): void {
  const container = selectElement<HTMLElement>('body');
  container.innerHTML = `
    <div class="card" data-state="#about">
      ${createHeader()}
      <div class="card-main">
        ${createAboutSection()}
        ${createExperienceSection()}
        ${createContactSection()}
        ${createButtons()}
      </div>
    </div>
  `;

  const buttons = document.querySelectorAll<HTMLButtonElement>(".card-buttons button");
  const sections = document.querySelectorAll<HTMLElement>(".card-section");
  const card = selectElement<HTMLElement>(".card");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const targetSection = target.getAttribute("data-section");
      if (!targetSection) return;

      const section = selectElement<HTMLElement>(targetSection);
      if (targetSection !== "#about") {
        card.classList.add("is-active");
      } else {
        card.classList.remove("is-active");
      }

      card.setAttribute("data-state", targetSection);
      sections.forEach((s) => s.classList.remove("is-active"));
      buttons.forEach((b) => b.classList.remove("is-active"));
      target.classList.add("is-active");
      section.classList.add("is-active");
    });
  });
}
