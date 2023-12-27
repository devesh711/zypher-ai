import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from "@nextui-org/react";

export default function Menu() {
    const [selectedKeys, setSelectedKeys] = React.useState(
        new Set(["Zypher-Chat"])
    );

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    color="primary"
                    variant="faded"
                    className="capitalize dark"
                >
                    {selectedValue}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
            >
                <DropdownItem key="zypher-chat">Zypher-Chat</DropdownItem>
                <DropdownItem key="heart">Heart</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
