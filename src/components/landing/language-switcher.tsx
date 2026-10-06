"use client";

// ============================================================
// PUSATPERIZINAN.COM — Language Switcher (30 Bahasa Dunia)
// Popover + Command: pencarian, flag, nama native + Inggris,
// badge RTL, penutur. Persist otomatis via LanguageProvider.
// ============================================================

import { useState } from "react";
import { Globe, Check, ChevronsUpDown, Languages } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LANGUAGES } from "@/lib/i18n/languages";
import type { LangCode } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ variant = "default" }: { variant?: "default" | "ghost" }) {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t, meta } = useLanguage();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          // Radix menurunkan aria-controls dari useId; saat HMR/stale-cache membuat
          // HTML server & JS client beda versi, ID ini bisa meleset hanya pada
          // atribut — fungsi popover tetap konsisten. Suppres agar tidak muncul
          // false-positive hydration error (mismatch teks/struktur lain tetap terdeteksi).
          suppressHydrationWarning
          variant={variant === "ghost" ? "ghost" : "outline"}
          role="combobox"
          aria-expanded={open}
          aria-label={`${t("languageLabel")}: ${meta.native}`}
          className={cn(
            "h-9 gap-1.5 rounded-full px-3 font-semibold",
            variant === "default" && "border-border/80 shadow-sm"
          )}
        >
          <Globe className="h-4 w-4 text-primary" />
          <span className="hidden xl:inline max-w-[92px] truncate">{meta.native}</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 text-[10px] font-bold text-primary">
            30
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[290px] p-0" align="end">
        <Command>
          <CommandInput placeholder={t("searchLanguages")} className="h-9" />
          <CommandList className="max-h-[300px] overflow-y-auto scrollbar-thin">
            <CommandEmpty>—</CommandEmpty>
            <CommandGroup>
              {LANGUAGES.map((l) => (
                <CommandItem
                  key={l.code}
                  value={`${l.native} ${l.english} ${l.code}`}
                  onSelect={() => {
                    setLang(l.code as LangCode);
                    setOpen(false);
                  }}
                  className="gap-2.5 py-2"
                >
                  <span className="text-base leading-none" aria-hidden>
                    {l.flag}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold leading-tight">{l.native}</span>
                    <span className="block text-[11px] text-muted-foreground leading-tight">
                      {l.english} • {l.speakers}
                    </span>
                  </span>
                  {l.rtl && (
                    <span className="rounded bg-muted px-1 py-0.5 text-[9px] font-bold tracking-wide text-muted-foreground">
                      RTL
                    </span>
                  )}
                  <Check
                    className={cn("h-4 w-4 shrink-0", lang === l.code ? "opacity-100 text-primary" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="border-t border-border/60 px-3 py-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Languages className="h-3 w-3 text-primary" />
            <span>30 bahasa teratas dunia • 90% pengguna internet</span>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
