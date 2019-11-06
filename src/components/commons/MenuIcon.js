import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import {
  darkBlue,
  primaryTint,
  inactiveTint,
  secondaryTint
} from "../../styles/Colors";
import { Feather } from "@expo/vector-icons";

export default class CustomMenuIcon extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };
  option2Click = () => {
    this._menu.hide();
    this.props.option2Click();
  };
  option3Click = () => {
    this._menu.hide();
    this.props.option3Click();
  };
  option4Click = () => {
    this._menu.hide();
    this.props.option4Click();
  };
  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
          style={{ backgroundColor: secondaryTint }}
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
              <Feather name='more-horizontal' size={26} color={darkBlue} />
            </TouchableOpacity>
          }
        >
          <MenuItem textStyle={{ color: "white" }} onPress={this.option1Click}>
            Go Premium Version
          </MenuItem>
          <MenuItem textStyle={{ color: "white" }} onPress={this.option2Click}>
            Watchlist
          </MenuItem>
          <MenuItem onPress={this.option3Click} disabled>
            op3:Disabled option
          </MenuItem>
          <MenuDivider color={inactiveTint} />
          <MenuItem textStyle={{ color: "white" }} onPress={this.option4Click}>
            Logout
          </MenuItem>
        </Menu>
      </View>
    );
  }
}
