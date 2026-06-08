import { Link } from "@tanstack/react-router";
import { NewsletterForm } from "./NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border">
      <div className="container-aurelia">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <span className="font-serif text-2xl uppercase font-bold tracking-tighter">Aurelia</span>
            <p className="mt-6 text-[13px] text-muted-foreground leading-relaxed max-w-xs">
              Crafting timeless silhouettes for the contemporary wardrobe. Focused on sustainable craftsmanship and refined aesthetics.
            </p>
            <div className="mt-8 max-w-xs">
              <NewsletterForm compact />
            </div>
          </div>
          <FooterCol title="Boutique">
            <FooterLink to="/shop" search={{ category: "new" as const }}>New Arrivals</FooterLink>
            <FooterLink to="/collections">Collections</FooterLink>
            <FooterLink to="/shop" search={{ category: "men" as const }}>Menswear</FooterLink>
            <FooterLink to="/shop" search={{ category: "women" as const }}>Womenswear</FooterLink>
          </FooterCol>
          <FooterCol title="Client Care">
            <FooterLink to="/policies/shipping">Shipping</FooterLink>
            <FooterLink to="/policies/returns">Returns</FooterLink>
            <FooterLink to="/policies/size-guide">Size Guide</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterCol>
          <FooterCol title="Company">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/about">Sustainability</FooterLink>
            <FooterLink to="/about">Press</FooterLink>
            <FooterLink to="/about">Journal</FooterLink>
          </FooterCol>
          <FooterCol title="Social">
            <a href="#" className="block text-[13px] text-muted-foreground hover:text-foreground py-1">Instagram</a>
            <a href="#" className="block text-[13px] text-muted-foreground hover:text-foreground py-1">Pinterest</a>
            <a href="#" className="block text-[13px] text-muted-foreground hover:text-foreground py-1">Twitter</a>
          </FooterCol>
        </div>

        <div className="border-t border-border pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
          <p>© {new Date().getFullYear()} Aurelia Apparel. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/policies/privacy">Privacy Policy</Link>
            <Link to="/policies/terms">Terms of Service</Link>
            <Link to="/policies/shipping">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-widest font-semibold mb-6">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ to, search, children }: { to: string; search?: Record<string, unknown>; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        search={search as never}
        className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}