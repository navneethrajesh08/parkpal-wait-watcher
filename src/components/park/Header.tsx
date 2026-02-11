import { AppConfig } from "@/config/AppConfig";
import { ArrowLeft, Waves } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-5 px-4 shadow-lg">
      <div className="max-w-5xl mx-auto">
        {AppConfig.backButton.enabled && (
          <a
            href={AppConfig.backButton.targetUrl}
            target={AppConfig.backButton.openInNewTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 transition-opacity mb-3"
          >
            <ArrowLeft size={16} />
            {AppConfig.backButton.label}
          </a>
        )}
        <div className="flex items-center gap-3">
          <Waves size={28} className="text-park-accent" />
          <div>
            <h1 className="text-xl font-extrabold leading-tight">
              {AppConfig.headerTitle}
            </h1>
            <p className="text-sm opacity-75 font-semibold">
              {AppConfig.headerSubtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
