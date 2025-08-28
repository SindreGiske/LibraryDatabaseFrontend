import {Box, Button, Heading, Modal, Page, Switch, TextField, VStack} from "@navikt/ds-react";
import {Form, useNavigate} from "react-router";
import {useRef, useState} from "react";
import {createUser} from "~/api/LoginAPI";
import {useUser} from "~/context/UserContext";

function CreateUser() {

    const {setUser} = useUser();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const ref = useRef<HTMLDialogElement>(null);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    
    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === confirmPassword) {
            if (name && email && password) {
                try {
                    const data = await createUser(name, email, password);

                    console.log("CreateUser res data: " + data);
                    setMessage(data.message);
                    setUser(data.body)
                    ref.current?.showModal()
                } catch (e) {
                    console.error(e);
                }
            } else {
                alert("Please enter an Email and a password.")
            }
        } else {
            alert("Passwords don't match");
        }
    }

    return (
        <Page.Block gutters width={"lg"} as={"main"}>
            <VStack className={"flex flex-col items-center justify-center w-full mt-8 py-16 rounded-4xl" +
                " border-2"} gap={"4"}>
                <Heading size="xlarge">Create User</Heading>
                <Form
                    className={"flex flex-col items-center justify-center gap-3"}
                    onSubmit={handleCreate}
                >
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        label={"name"}
                    />
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        label={"Email"}
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        label={"Password"}
                        type="password"
                    />

                    <TextField
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label={"Repeat Password"}
                        type="password"
                    />
                    <Button type="submit" color="secondary">Create</Button>
                </Form>

                <Switch
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                >
                    Keep me logged in
                </Switch>
                {message && (
                    <Box className="mt-4 p-4 border rounded-lg bg-gray-100">
                        {message}
                    </Box>
                )}
            </VStack>
            <Modal ref={ref} header={{heading: `User ${email} has been created!`, size: "small"}}>
                <Modal.Body>
                    <Button onClick={() => (navigate("/dashboard", {replace: true}))}>Log In</Button>
                </Modal.Body>
            </Modal>
        </Page.Block>
    );
}

export default CreateUser;