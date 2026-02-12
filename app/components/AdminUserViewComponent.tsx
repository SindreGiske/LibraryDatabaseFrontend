import {Button, Heading} from "@navikt/ds-react";
import {PersonFillIcon, SealCheckmarkFillIcon} from "@navikt/aksel-icons";

export type AdminUserViewProps = {
    user: AdminFullUserInformation,
    onClick?: () => void;
}

export default function AdminUserViewComponent(
    {user, onClick}: AdminUserViewProps,
) {

    return (
        <Button className={"bookComponent pt-9!"} onClick={onClick}>
            <Heading align={"center"} size={"medium"}>{user.name}</Heading>
            {user.admin ?
                <SealCheckmarkFillIcon className={""} title="a11y-title" fontSize="1.5rem"/>
                :
                <PersonFillIcon title="a11y-title" fontSize="1.5rem"/>
            }
        </Button>
    )
}