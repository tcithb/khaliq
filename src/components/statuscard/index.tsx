import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function StatusCard({
  title,
  count,
  date,
  buttonTitle,
  onClick,
}: any) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography component="p" variant="h4">
        {count}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {date}
      </Typography>
      {onClick && (
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            {buttonTitle}
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}
