"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ListChecks, Lightbulb, Database, Users, MapPinIcon, ShieldAlert, Settings, BrainCircuit, Cloud, Share2, Watch } from 'lucide-react';

export default function ProjectReportPage() {
  const features = [
    {
      icon: <ShieldAlert className="h-5 w-5 text-primary" />,
      title: 'SOS Alerts',
      description: 'Quickly send distress signals with current location to pre-configured emergency contacts.',
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: 'Emergency Contacts Management',
      description: 'Add, edit, and delete emergency contacts who will be notified.',
    },
    {
      icon: <MapPinIcon className="h-5 w-5 text-primary" />,
      title: 'Live Location Map',
      description: 'View current geographical position on an interactive map.',
    },
    {
      icon: <ListChecks className="h-5 w-5 text-primary" />,
      title: 'Route History Logging',
      description: 'Maintain a log of location check-ins and SOS activation points.',
    },
    {
        icon: <ShieldAlert className="h-5 w-5 text-primary" />,
        title: 'Check-in Feature',
        description: 'Manually log current location to route history for peace of mind.',
    }
  ];

  const technologies = [
    'Next.js (App Router)',
    'React with TypeScript',
    'Tailwind CSS',
    'ShadCN UI',
    'Lucide React Icons',
    'Google Maps Platform API',
    'Browser Geolocation API',
    'Browser LocalStorage',
    'Genkit & Google AI (Setup for future GenAI features)',
  ];

  const futureEnhancements = [
    {
      icon: <Cloud className="h-5 w-5 text-green-500" />,
      title: 'User Authentication & Cloud Storage',
      description: 'Secure user accounts and persist data in the cloud (e.g., Firebase).',
    },
    {
      icon: <Share2 className="h-5 w-5 text-blue-500" />,
      title: 'Real-time Location Sharing',
      description: 'Allow users to share their live location with trusted contacts during a trip.',
    },
    {
      icon: <BrainCircuit className="h-5 w-5 text-purple-500" />,
      title: 'GenAI-Powered Route Safety Analysis',
      description: 'Utilize AI to analyze route safety based on various factors and provide suggestions.',
    },
    {
      icon: <Watch className="h-5 w-5 text-orange-500" />,
      title: 'Wearable Device Integration',
      description: 'Extend SOS and tracking features to smartwatches and other wearables.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SaferouteSOS: Project Report</h1>
        <p className="text-muted-foreground">
          An overview of the SaferouteSOS application, its features, technologies, and development.
        </p>
      </div>

      <Accordion type="multiple" defaultValue={['overview', 'features']} className="w-full">
        <AccordionItem value="overview">
          <AccordionTrigger className="text-xl font-semibold">Project Overview</AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed px-1">
            SaferouteSOS is a personal safety application designed to provide users with tools to enhance their safety during travel or daily activities. It allows users to quickly alert emergency contacts, track their location, and maintain a history of their routes. The primary goal is to offer peace of mind and a quick response mechanism in case of emergencies.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="text-xl font-semibold">Key Features</AccordionTrigger>
          <AccordionContent className="px-1">
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                    {feature.icon}
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tech-stack">
          <AccordionTrigger className="text-xl font-semibold">Technology Stack</AccordionTrigger>
          <AccordionContent className="px-1">
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The application leverages modern web technologies to deliver a responsive, performant, and user-friendly experience.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dev-process">
          <AccordionTrigger className="text-xl font-semibold">Development Process & Architecture</AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed px-1 space-y-3">
            <p>
              <Settings className="inline-block mr-2 h-5 w-5 text-muted-foreground" />
              <strong>Component-Based Architecture:</strong> The UI is built using reusable React functional components with Hooks, promoting modularity and maintainability. ShadCN UI provides a set of pre-built, accessible components.
            </p>
            <p>
              <Database className="inline-block mr-2 h-5 w-5 text-muted-foreground" />
              <strong>Service Layer:</strong> Business logic for data operations (e.g., managing contacts, route history) is encapsulated in service files located in <code>src/lib/services</code>. This separates concerns and makes data handling more organized.
            </p>
            <p>
              <Users className="inline-block mr-2 h-5 w-5 text-muted-foreground" />
              <strong>Client-Side Focus:</strong> Currently, the application operates primarily on the client-side. Data persistence for emergency contacts and route history is handled using the browser's LocalStorage.
            </p>
             <p>
              <Lightbulb className="inline-block mr-2 h-5 w-5 text-muted-foreground" />
              <strong>Styling Approach:</strong> Tailwind CSS is used for utility-first styling, allowing for rapid UI development. The application's theme is managed via CSS variables (<code>globals.css</code>) and aligns with ShadCN UI conventions.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="future-enhancements">
          <AccordionTrigger className="text-xl font-semibold">Potential Future Enhancements</AccordionTrigger>
          <AccordionContent className="px-1">
             <div className="grid md:grid-cols-2 gap-6 mt-4">
              {futureEnhancements.map((enhancement, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                    {enhancement.icon}
                    <CardTitle className="text-lg">{enhancement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{enhancement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              These enhancements aim to expand the application's capabilities, improve user experience, and leverage emerging technologies like GenAI for smarter safety features.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
