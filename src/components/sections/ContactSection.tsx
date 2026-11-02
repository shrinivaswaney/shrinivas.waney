'use client';

import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { siteCopy } from '@/data/meta';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
  XIcon,
} from '@phosphor-icons/react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import {
  ContactAddress,
  ContactContent,
  ContactDescription,
  ContactEmail,
  ContactForm,
  ContactGrid,
  ContactHeading,
  ContactInfo,
  ContactLabel,
  ContactLink,
  ContactLinkIcon,
  ContactList,
  ContactRow,
  ContactSectionContainer,
  ContactSocialLink,
  ContactSocials,
  ContactStatus,
  ContactSubmit,
  ContactTitle,
  Field,
  FieldError,
  FieldLabel,
  FormHeader,
  FormTitle,
  MessageCount,
  StatusClose,
} from './styles/ContactSection.styles';

gsap.registerPlugin(ScrollTrigger);

type SubmissionStatus = { type: 'success' | 'error'; message: string } | null;

const socialChannels = [
  { id: 'github', label: 'GitHub', Icon: GithubLogoIcon },
  { id: 'linkedin', label: 'LinkedIn', Icon: LinkedinLogoIcon },
  { id: 'instagram', label: 'Instagram', Icon: InstagramLogoIcon },
] as const;

const contactIcons = {
  email: EnvelopeIcon,
  phone: PhoneIcon,
} as const;

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, getLocalizedText(siteCopy.contactNameRequired))
    .max(100, getLocalizedText(siteCopy.contactNameTooLong)),
  email: z
    .string()
    .trim()
    .min(1, getLocalizedText(siteCopy.contactEmailRequired))
    .email(getLocalizedText(siteCopy.contactEmailInvalid))
    .max(254, getLocalizedText(siteCopy.contactEmailTooLong)),
  message: z
    .string()
    .trim()
    .min(1, getLocalizedText(siteCopy.contactMessageRequired))
    .max(1000, getLocalizedText(siteCopy.contactMessageTooLong)),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });
  const messageLength = (useWatch({ control, name: 'message' }) ?? '').length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-contact-reveal]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        },
      );
    }, section);

    return () => context.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!status) return;
    const timeout = window.setTimeout(() => setStatus(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const submitContactForm = async (formData: ContactFormData) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message: getLocalizedText(siteCopy.contactConfigError),
      });
      return;
    }

    setStatus(null);

    try {
      await emailjs.send(serviceId, templateId, formData, { publicKey });
      reset();
      setStatus({
        type: 'success',
        message: getLocalizedText(siteCopy.contactSuccess),
      });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus({
        type: 'error',
        message: getLocalizedText(siteCopy.contactError),
      });
    }
  };

  const email = profile.contactChannels.find((channel) => channel.id === 'email');
  const directChannels = profile.contactChannels.filter(
    (channel) => channel.id === 'email' || channel.id === 'phone',
  );
  const socials = profile.contactChannels.filter((channel) =>
    socialChannels.some((social) => social.id === channel.id),
  );

  return (
    <ContactSectionContainer ref={sectionRef} id="contact" aria-labelledby="contact-title">
      <ContactContent>
        <ContactHeading data-contact-reveal>
          <ContactLabel>{getLocalizedText(siteCopy.contactKicker)}</ContactLabel>
          <ContactTitle id="contact-title">{getLocalizedText(siteCopy.contactTitle)}</ContactTitle>
          {email && (
            <ContactEmail href={email.href} data-cursor={getLocalizedText(siteCopy.contactWrite)}>
              <span>{email.value}</span>
              <ArrowUpRightIcon size={28} aria-hidden="true" />
            </ContactEmail>
          )}
        </ContactHeading>

        <ContactGrid>
          <ContactInfo data-contact-reveal>
            <h3>{getLocalizedText(siteCopy.contactSubtitle)}</h3>
            <ContactDescription>{getLocalizedText(siteCopy.contactDescription)}</ContactDescription>

            <ContactList>
              {directChannels.map((channel) => {
                const Icon = contactIcons[channel.id as keyof typeof contactIcons];
                return (
                  <ContactRow key={channel.id}>
                    <ContactLink href={channel.href}>
                      <ContactLabel>{getLocalizedText(channel.label)}</ContactLabel>
                      <ContactLinkIcon>
                        <Icon size={18} aria-hidden="true" />
                      </ContactLinkIcon>
                      <ContactAddress>{channel.value}</ContactAddress>
                      <ArrowUpRightIcon size={16} aria-hidden="true" />
                    </ContactLink>
                  </ContactRow>
                );
              })}
              <ContactRow>
                <ContactLink as="div">
                  <ContactLabel>{getLocalizedText(siteCopy.contactLocationLabel)}</ContactLabel>
                  <ContactLinkIcon>
                    <MapPinIcon size={18} aria-hidden="true" />
                  </ContactLinkIcon>
                  <ContactAddress>{getLocalizedText(profile.location)}</ContactAddress>
                </ContactLink>
              </ContactRow>
            </ContactList>

            <ContactSocials aria-label={getLocalizedText(siteCopy.contactSocialsLabel)}>
              {socials.map((channel) => {
                const social = socialChannels.find((item) => item.id === channel.id);
                if (!social) return null;
                const Icon = social.Icon;

                return (
                  <ContactSocialLink
                    key={channel.id}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {social.label}
                  </ContactSocialLink>
                );
              })}
            </ContactSocials>
          </ContactInfo>

          <ContactForm onSubmit={handleSubmit(submitContactForm)} data-contact-reveal noValidate>
            <FormHeader>
              <FormTitle>
                {'>'} {getLocalizedText(siteCopy.contactFormTitle)}{' '}
                <span aria-hidden="true">_</span>
              </FormTitle>
            </FormHeader>

            <Field>
              <FieldLabel htmlFor="contact-name">
                01 · {getLocalizedText(siteCopy.contactName)}
              </FieldLabel>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder={getLocalizedText(siteCopy.contactNamePlaceholder)}
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                {...register('name')}
              />
              {errors.name && (
                <FieldError id="contact-name-error" role="alert">
                  {errors.name.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="contact-email">
                02 · {getLocalizedText(siteCopy.contactEmail)}
              </FieldLabel>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder={getLocalizedText(siteCopy.contactEmailPlaceholder)}
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                {...register('email')}
              />
              {errors.email && (
                <FieldError id="contact-email-error" role="alert">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="contact-message">
                03 · {getLocalizedText(siteCopy.contactMessage)}
              </FieldLabel>
              <textarea
                id="contact-message"
                rows={5}
                maxLength={1000}
                placeholder={getLocalizedText(siteCopy.contactMessagePlaceholder)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message
                    ? 'contact-message-error contact-message-count'
                    : 'contact-message-count'
                }
                {...register('message')}
              />
              {errors.message && (
                <FieldError id="contact-message-error" role="alert">
                  {errors.message.message}
                </FieldError>
              )}
              <MessageCount id="contact-message-count" aria-live="polite">
                {messageLength} / 1000
              </MessageCount>
            </Field>

            <ContactSubmit type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
              {getLocalizedText(isSubmitting ? siteCopy.contactSending : siteCopy.contactSend)}
              <ArrowRightIcon size={16} aria-hidden="true" />
            </ContactSubmit>
          </ContactForm>
        </ContactGrid>

        {status && (
          <ContactStatus
            role={status.type === 'error' ? 'alert' : 'status'}
            aria-live={status.type === 'error' ? 'assertive' : 'polite'}
            $type={status.type}
          >
            <span>{status.message}</span>
            <StatusClose
              type="button"
              onClick={() => setStatus(null)}
              aria-label={getLocalizedText(siteCopy.contactDismiss)}
            >
              <XIcon size={18} aria-hidden="true" />
            </StatusClose>
          </ContactStatus>
        )}
      </ContactContent>
    </ContactSectionContainer>
  );
}
