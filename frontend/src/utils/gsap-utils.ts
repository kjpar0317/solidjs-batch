import { gsap } from "gsap";

export function shuffleCardArea(card_elem_arr: string[] | Element[]): gsap.core.Timeline {
  let box: gsap.core.Timeline = gsap.timeline();

  card_elem_arr.forEach((m: string | Element, i: number): void => {
    if (i % 2 === 0) {
      box.fromTo(m, { opacity: 0, x: 1000 }, { opacity: 1, x: 0, ease: "power3.out", duration: 0.6 });
    } else {
      box.fromTo(m, { opacity: 0, y: 1000 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.6 });
    }
  });

  return box;
}

export function setAnimateNavMenu(container_elem: string, close_elem: string): gsap.core.Timeline {
  const open: Element | null = document.querySelector(container_elem);
  const close: Element | null = document.querySelector(close_elem);
  let tl: gsap.core.Timeline = gsap.timeline({ defaults: { duration: 1, ease: "expo.inOut" } });

  open &&
    open.addEventListener("click", (): void => {
      if (tl.reversed()) {
        tl.play();
      } else {
        tl.to("nav", { right: 0 })
          .to("nav", { height: "100vh" }, "-=.1")
          .to("nav ul li a", { opacity: 1, pointerEvents: "all", stagger: 0.2 }, "-=.8")
          .to(close_elem, { opacity: 1, pointerEvents: "all" }, "-=.8")
          .to("nav h2", { opacity: 1 }, "-=1");
      }
    });

  close &&
    close.addEventListener("click", (): void => {
      tl.reverse();
    });

  return tl;
}

export function setAnimateNumberCount(elem: string | any, duration: number): void {
  gsap.context((): void => {
    // Our animations can use selector text like ".box"
    // this will only select '.box' elements that are children of the component
    gsap.from(elem, {
      textContent: 0,
      duration: duration,
      ease: "power1.easeIn",
      snap: { textContent: 1 },
      stagger: 1,
    });
  }, elem);
}

export function setAnimateModal(target_elem_id: string): gsap.core.Timeline {
  return gsap
    .timeline({ defaults: { ease: "power2.inOut" } })
    .to(`#${target_elem_id}`, { scaleY: 0.01, x: 1, opacity: 1, display: "flex", duration: 0.4 })
    .to(`#${target_elem_id}`, { scaleY: 1, background: "rgba(255,255,255,0.16)", duration: 0.6 })
    .to(`#${target_elem_id} #second`, { scaleY: 1, opacity: 1, duration: 0.6 }, "-=0.4")
    .to(`#${target_elem_id} #third`, { scaleY: 1, opacity: 1, duration: 0.4 }, "-=0.2")
    .to(`#${target_elem_id} #fourth`, { background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.3)", duration: 0.8 }, "-=0.4");
}

export const getTopOffset: (element: Element) => number = (element: Element): number => element.getBoundingClientRect().top;

export const getTopOffsetGoal: (element: Element & ChildNode) => number = (element: Element & ChildNode): number =>
  (window.innerHeight - element.clientHeight) / 2;

export function openMenuTimeline(selname: string, node: HTMLElement, refs: any, menuIsOpen: boolean): void {
  const enterTL: gsap.core.Timeline = gsap.timeline({ paused: true });
  const { backgroundRef, menuItemRefs } = refs;
  const stripe: Element | null = document.querySelector(selname);
  const firstStripe: Element | undefined = stripe?.childNodes[0] as Element;
  const topOffsetGoal: number = (firstStripe && getTopOffsetGoal(firstStripe)) || 0;

  enterTL
    .to(backgroundRef.current, { duration: 0.5, autoAlpha: menuIsOpen ? 1 : 0 })
    .to(node, { duration: 0.5, right: menuIsOpen ? 0 : -200, autoAlpha: menuIsOpen ? 1 : 0 })
    .to(menuItemRefs.current, { duration: 0.4, left: menuIsOpen ? 0 : 100, ease: "power3.out", autoAlpha: 1 }, 0.1)
    .to(stripe, { duration: 0.8, transform: `translateY(${topOffsetGoal}px)`, ease: "power3.out", autoAlpha: menuIsOpen ? 1 : 0 });

  enterTL.play();
}

export function closeMenuTimeline(selname: string, node: HTMLElement, refs: any, menuIsOpen: boolean): void {
  const exitTL: gsap.core.Timeline = gsap.timeline({ paused: true });
  const { backgroundRef, menuItemRefs } = refs;
  const stripe: Element | null = document.querySelector(selname);

  exitTL
    .to(menuItemRefs.current, { duration: 0.4, left: menuIsOpen ? 0 : 200, ease: "power3.in", stagger: 0.05 }, 0)
    .to(node, { duration: 0, right: menuIsOpen ? 0 : -200, autoAlpha: menuIsOpen ? 1 : 0 })
    .to(backgroundRef.current, { duration: 0.5, autoAlpha: menuIsOpen ? 1 : 0 })
    .to(stripe, { duration: 0.8, top: "100vh", transform: "none", ease: "power3.in", autoAlpha: menuIsOpen ? 1 : 0 }, 0);
  exitTL.play();
}

export function moveToStripe(selname: string, stripeName: string): void {
  const stripeContainer: Element | null = document.querySelector(selname);
  const stripeItems: any = stripeContainer?.childNodes || null;
  const topOffsetObjective: number = (stripeItems && stripeItems.length > 0 && getTopOffsetGoal(stripeItems[0])) || 0;
  const wantedPicture: any = [...stripeItems].find((pic: any): boolean => pic.id === stripeName);
  const presentOffset: number = (stripeContainer && getTopOffset(stripeContainer)) || 0;
  const wantedPictureOffset: number = getTopOffset(wantedPicture);
  const distanceToGo: number = presentOffset - wantedPictureOffset + topOffsetObjective;

  gsap.to(stripeContainer, { duration: 0.7, transform: `translateY(${distanceToGo}px)`, ease: "power3.inout" });
}
