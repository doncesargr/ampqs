import { Amplify } from "aws-amplify";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Embed from "./Embed";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut }) {
  return (
    <Authenticator loginMechanisms={["username"]} variation="modal">
      {({ signOut, user }) => (
        <main>
          <Container sx={{ p: 2 }} maxWidth="sm">
            <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
              <Typography variant="h4" component="div" gutterBottom>
                Hello {user.username}
              </Typography>
              <Button variant="contained" onClick={signOut}>
                <Typography variant="button" display="block" gutterBottom>
                  Logout
                </Typography>
              </Button>
              <Embed />
            </Box>
          </Container>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
