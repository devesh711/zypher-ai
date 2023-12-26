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
        new Set(["ZYPHER-CHAT"])
    );

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="faded" className="capitalize">
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
                <DropdownItem key="zypher-chat">ZYPHER-CHAT</DropdownItem>
                <DropdownItem key="heart">Heart</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
