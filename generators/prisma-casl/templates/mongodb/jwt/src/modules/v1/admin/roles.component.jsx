import React from 'react';
import { flat } from 'adminjs';
import SimpleBadges from './simple-badges.component';

export default function Roles({ record }) {
  return (
    <SimpleBadges items={flat.unflatten(record.params).roles} />
  );
}
