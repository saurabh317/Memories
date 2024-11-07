import styled from "@emotion/styled"
import { Dialog, Drawer, Slide, SwipeableDrawer } from "@mui/material"
import React from "react"

export const DrawerContents = styled.div`
  display: block;
  padding: ${props => props.theme.marginVert} ${props => props.theme.marginHorz};
  background-color: ${props => props.theme.contrast0};
  height: 100%;
  width: 'fit-content';
`
export const MobileDrawerContents = styled.div`
  display: block;
  height: 100%;
  margin-bottom: ${props => props.$marginBottom}px;
  background-color: ${props => props.theme.contrast0};
  min-width: ${props => props.$fullWidth ? '100vw' : '300px'};
`

export const Backdrop = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: backdrop-filter 0.5s;
  transition: -webkit-backdrop-filter 0.5s;
`;

export const ModalDialog = styled(Dialog)`
  z-index: 1600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SwipeableDrawerWrapper = (props) => {
  const { anchor, open, setOpen, fullWidth=false, closeOnSwipe, isDrawer } = props
  const DrawerContent = isDrawer ? MobileDrawerContents : DrawerContents
  const DrawerWrapper = closeOnSwipe ? SwipeableDrawer : Drawer

  const sxDrawer = {
    '&.MuiDrawer-root': {
      zIndex: "1300",
    },
  }

  return (
    <DrawerWrapper
      sx={sxDrawer}
      anchor={anchor}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DrawerContent
        $fullWidth={fullWidth}
      >
        {props.children}
      </DrawerContent>
    </DrawerWrapper>
  )
}

const Transition = React.forwardRef(function Transition(props, ref){
  return <Slide direction='up' ref={ref} {...props} />
})

export const ModalDialogWrapper = (props) => {
  return(
    <ModalDialog
      open={props.open}
      onClose={props.onClose}
      BackdropComponent={props.Backdrop}
      TransitionComponent={Transition}
      maxWidth='100%'
    >
      {props.children}
    </ModalDialog>
  )
}