import React, { ReactNode } from "react";

import {
    Dialog,
    Grid,
    makeStyles,
    DialogContent,
    Button,
    DialogActions,
    Typography,
    useTheme,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import FingerTouchIcon from "@components/FingerTouchIcon";
import PushNotificationIcon from "@components/PushNotificationIcon";
import TimerIcon from "@components/TimerIcon";
import { SecondFactorMethod } from "@models/Methods";

export interface Props {
    open: boolean;
    methods: Set<SecondFactorMethod>;
    webauthnSupported: boolean;

    onClose: () => void;
    onClick: (method: SecondFactorMethod) => void;
}

const MethodSelectionDialog = function (props: Props) {
    const style = useStyles();
    const theme = useTheme();
    const { t: translate } = useTranslation();

    const pieChartIcon = (
        <TimerIcon width={24} height={24} period={15} color={theme.palette.primary.main} backgroundColor={"white"} />
    );

    return (
        <Dialog open={props.open} className={style.root} onClose={props.onClose}>
            <DialogContent>
                <Grid container justifyContent="center" spacing={1} id="methods-dialog">
                    {props.methods.has(SecondFactorMethod.TOTP) ? (
                        <MethodItem
                            id="one-time-password-option"
                            method={translate("Time-based One-Time Password")}
                            icon={pieChartIcon}
                            onClick={() => props.onClick(SecondFactorMethod.TOTP)}
                        />
                    ) : null}
                    {props.methods.has(SecondFactorMethod.Webauthn) && props.webauthnSupported ? (
                        <MethodItem
                            id="webauthn-option"
                            method={translate("Security Key - WebAuthN")}
                            icon={<FingerTouchIcon size={32} />}
                            onClick={() => props.onClick(SecondFactorMethod.Webauthn)}
                        />
                    ) : null}
                    {props.methods.has(SecondFactorMethod.MobilePush) ? (
                        <MethodItem
                            id="push-notification-option"
                            method={translate("Push Notification")}
                            icon={<PushNotificationIcon width={32} height={32} />}
                            onClick={() => props.onClick(SecondFactorMethod.MobilePush)}
                        />
                    ) : null}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MethodSelectionDialog;

const useStyles = makeStyles(() => ({
    root: {
        textAlign: "center",
    },
}));

interface MethodItemProps {
    id: string;
    method: string;
    icon: ReactNode;

    onClick: () => void;
}

function MethodItem(props: MethodItemProps) {
    const style = makeStyles((theme) => ({
        item: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            width: "100%",
        },
        icon: {
            display: "inline-block",
            fill: "white",
        },
        buttonRoot: {
            display: "block",
        },
    }))();

    return (
        <Grid item xs={12} className="method-option" id={props.id}>
            <Button
                className={style.item}
                color="primary"
                classes={{ root: style.buttonRoot }}
                variant="contained"
                onClick={props.onClick}
            >
                <div className={style.icon}>{props.icon}</div>
                <div>
                    <Typography>{props.method}</Typography>
                </div>
            </Button>
        </Grid>
    );
}
