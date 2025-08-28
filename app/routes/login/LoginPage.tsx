import {Box, Button, Heading, Label, Page, TextField, VStack} from "@navikt/ds-react";
import {Form, Link, useNavigate} from "react-router";
import {useState} from "react";
import {attemptLogin} from "~/api/LoginAPI";
import {useUser} from "~/context/UserContext";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const {setUser} = useUser();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && password) {
            try {
                const data = await attemptLogin(email, password);
                console.log("handleLogin res: ", data);

                console.log("handleLogin res data: " + data);
                setMessage(data.message);
                setUser(data.body)
                navigate("/dashboard", {replace: true});
            } catch (e) {
                console.error(e);
            }
        } else {
            alert("Please enter an Email and a password.")
        }
    }

    return (
        <Page.Block gutters width={"lg"} as={"main"}>
            <VStack className={"flex flex-col items-center justify-center w-full mt-8 py-16 rounded-4xl" +
                " border-2"} gap={"4"}>
                <Heading size="xlarge">Login Page</Heading>
                <Form
                    className={"flex flex-col items-center justify-center gap-3"}
                    onSubmit={handleLogin}
                >
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        label={"Email"}
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        label={"Password"}
                        type="password"
                    />
                    <Button type="submit" color="secondary">Login</Button>
                </Form>
                {message && (
                    <Box className="mt-4 p-4 border rounded-lg bg-gray-100">
                        {message}
                    </Box>
                )}
                <Box height={"82px"} className={"flex flex-row gap-1 items-center justify-center m-4 p-8" +
                    " border-2 rounded-lg bg-amber-100/50"}>
                    <Label size="medium">Not registered yet?</Label>
                    <Link to={"/createUser"}>Click here!</Link>
                </Box>
            </VStack>
        </Page.Block>
    );
}

export default LoginPage;