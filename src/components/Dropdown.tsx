import * as React from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu, MenuListboxSlotProps } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";

export default function MenuDropdown() {
  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <Dropdown>
      <MenuButton>My account</MenuButton>
      <Menu className=" bg-bg_orange p-[8px] rounded-md">
        <MenuItem onClick={createHandleMenuClick("Profile")}>Profile</MenuItem>
        <MenuItem onClick={createHandleMenuClick("Language settings")}>
          Language settings
        </MenuItem>
        <MenuItem onClick={createHandleMenuClick("Log out")}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
}
