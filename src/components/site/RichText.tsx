import { Fragment } from "react";

/**
 * Rend la mise en forme légère des textes éditoriaux : **gras** et *italique*.
 * Aucune autre syntaxe n'est interprétée ; le texte reste celui de src/data.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**") && p.length > 4)
          return <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

/** Texte brut sans les marqueurs de mise en forme (pour les attributs et les métadonnées). */
export const plainText = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
