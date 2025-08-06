'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function TestButtonsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Shadcn Button Test</h1>
          <p className="text-muted-foreground">Testing the shadcn/ui Button component</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Default Button */}
          <Card>
            <CardHeader>
              <CardTitle>Default Button</CardTitle>
              <CardDescription>Standard shadcn button</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-40 h-12">View My Work</Button>
            </CardContent>
          </Card>

          {/* Outline Button */}
          <Card>
            <CardHeader>
              <CardTitle>Outline Button</CardTitle>
              <CardDescription>Button with outline variant</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-40 h-12">
                Get In Touch
              </Button>
            </CardContent>
          </Card>

          {/* Download Resume Button */}
          <Card>
            <CardHeader>
              <CardTitle>Download Resume</CardTitle>
              <CardDescription>Functional download button</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-44 h-12"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Anuvesh_Chilwal_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download Resume
              </Button>
            </CardContent>
          </Card>

          {/* Send Quick Mail Button */}
          <Card>
            <CardHeader>
              <CardTitle>Send Quick Mail</CardTitle>
              <CardDescription>Secondary variant button</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary"
                className="w-44 h-12"
                onClick={() => window.open('mailto:anuvesh@example.com?subject=Hello!&body=Hi there, I\'d like to get in touch about...', '_self')}
              >
                Send Quick Mail
              </Button>
            </CardContent>
          </Card>

          {/* Contact Me Button */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>Ghost variant button</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-40 h-12">
                Contact Me
              </Button>
            </CardContent>
          </Card>

          {/* Destructive Button */}
          <Card>
            <CardHeader>
              <CardTitle>Destructive Button</CardTitle>
              <CardDescription>Destructive variant for dangerous actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-40 h-12">
                Delete
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            All buttons and cards use shadcn/ui components with different variants
          </p>
        </div>
      </div>
    </div>
  );
}