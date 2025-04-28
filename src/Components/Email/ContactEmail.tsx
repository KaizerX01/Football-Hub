// emails/ContactEmail.tsx
import { Html, Body, Container, Text, Heading } from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: "#f4f4f5", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Heading>Hello, you received a new message! 📩</Heading>
          <Text>
            <strong>Name:</strong> {name}
          </Text>
          <Text>
            <strong>Email:</strong> {email}
          </Text>
          <Text>
            <strong>Message:</strong>
          </Text>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
