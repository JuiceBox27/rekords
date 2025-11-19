import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface PlaylistCardProps {
  id?: string;
  name: string;
  genre?: string;
  bpmFrom?: number;
  bpmTo?: number;
  description?: string;
  onView?: () => void;
  className?: string;
}

export default function PlaylistCard({
  name,
  genre,
  bpmFrom,
  bpmTo,
  description,
  onView,
  className,
}: PlaylistCardProps) {
  const bpmText = bpmFrom || bpmTo ? `${bpmFrom ?? "—"}${bpmFrom && bpmTo ? "–" : ""}${bpmTo ?? ""} BPM` : "— BPM";

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{genre ?? "Unknown genre"}</p>
          </div>

          <div className="text-sm text-muted-foreground">{bpmText}</div>
        </div>

        {description && <p className="mt-3 text-sm text-muted-foreground">{description}</p>}
      </CardContent>

      <CardFooter>
        <div className="ml-auto flex gap-2">
          <Button onClick={onView}>View</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export { PlaylistCard };
