import React from 'react';
import { Badge } from '@adminjs/design-system';

export default function SimpleBadges({ items }) {
  return (
    <div>
      {items && items.map((item, index) => <Badge key={index} className="me-1">{item}</Badge>)}
    </div>
  );
}
