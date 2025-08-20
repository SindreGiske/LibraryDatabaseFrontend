import {Button, Heading, Page, TextField, VStack} from "@navikt/ds-react";
import {Form} from "react-router";

function CreateUser () {



    return(
        <Page>
            <Page.Block gutters width={"lg"} as={"main"}>
                <Form>
                    <VStack className={"flex flex-col items-center justify-center w-full"} gap={"4"}>
                        <Heading size="xlarge">Create User</Heading>
                        <TextField label={"Name"}></TextField>
                        <TextField label={"Email"}></TextField>
                        <TextField label={"Password"}></TextField>
                        <TextField label={"Repeat Password"}></TextField>
                        <Button type="submit" color="secondary">Create</Button>

                    </VStack>
                </Form>
            </Page.Block>
        </Page>
    );
}

export default CreateUser;