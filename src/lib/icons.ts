'use client';
import {
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from '@phosphor-icons/react';

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'instagram':
      return InstagramLogoIcon;
    case 'linkedin':
      return LinkedinLogoIcon;
    case 'github':
      return GithubLogoIcon;
    case 'email':
      return EnvelopeIcon;
    case 'phone':
      return PhoneIcon;
    case 'location':
      return MapPinIcon;
    default:
      return null;
  }
};
