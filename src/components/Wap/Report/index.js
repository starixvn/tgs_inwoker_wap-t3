import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { ReportService } from "../../../api-services/services/ReportService";
import { GameService } from "../../../api-services/services/GameService";
import { accountAction } from "../../../api-services/actions/accountAction";
import { GeneralService } from "../../../api-services/services/GeneralService";
import BottomScrollListener from "react-bottom-scroll-listener";
import Loading from "../../Wap/Share/Loading";
import Header from "../../Wap/Share/Header";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import ErrorSwitcher from "../../../utils/ErrorSwitcher";
import { utility } from "../../../utils/utility";
import { wapBorderRadius } from "../../../config/settings";
const moment = require("moment");
const localeMap = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};
const Container = styled.div`
  width: 100%;
  padding: 100px 0;
  min-height: 100vh;
`;
const StyledAppBar = withStyles((theme) => ({
  root: {
    background: "none",
  },
}))(AppBar);

const DateContainer = styled.div`
  padding: 30px 40px 0px 40px;
`;
const DateSpliter = styled.div`
  font-size: 22px;

  color: #fff;
`;
const DateInner = styled.div`
  width: 320px;
  padding: 5px;
`;

const DateRangContainer = styled.div`space-between
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const DateRangSelection = styled.div`
  padding: 20px 30px;

  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  letter-spacing: normal;
  text-align: center;
  font-size: 28px;
  color: #fff;
  ${({ selected, theme }) => {
    return selected
      ? `background:  ${theme.primary}; `
      : `background: #27273f;`;
  }};
`;
const DataContent = styled.div`
  width: 690px;
  margin: 30px auto;
  background-color: #27273f;
  font-size: 26px;
  color: #fff;
  padding: 0 20px;
  border-radius: 20px;
`;
const DataHeader = styled.div`
  width: 690px;
  font-weight: 600;
  margin: 0 auto;

  font-size: 26px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
  padding: 0 20px;
`;
const DataRowId = styled.div`
  width: 100%;
  min-height: 40px;
  padding: 8px;
  font-weight: 600;
  font-size: 26px;
  display: flex;
`;
const IDCell = styled.span`
  font-weight: normal;
  font-size: 26px;
  display: flex;
  gap: 10px;
`;
const DataRow = styled.div`
  width: 100%;
  min-height: 78px;
  padding: 20px 0;
`;
const DataHeaderRow = styled(DataRow)`
  border-bottom: none;
`;
const DataDateCell3 = styled.div`
  float: left;
  width: calc(630px / 3 * 1);
  text-align: left;
`;
const DataDateCellAmount = styled.div`
  float: left;
  width: calc(630px / 3 * 1);
  text-align: right;
`;
const DataDateCell = styled.div`
  float: left;
  width: calc(630px / 4 * 1);
  text-align: left;
`;
const DataWinlossCell = styled.div`
  float: left;
  width: calc(630px / 4 * 1);
  text-align: right;
`;
const NoRecordContainer = styled.div`
  padding-bottom: 20px;
  color: #fff;

  margin: 300px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoRecordImage = styled.img``;

const NoRecordText = styled.div`
  font-size: 24px;
  margin-top: 20px;
  font-family: "Montserrat", sans-serif;
`;

const DatePickerTitle = styled.div`
  color: #fff;
  font-size: 24px;
  padding: 10px 0;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const CustomSelect = withStyles((theme) => ({
  root: {
    height: "50px",
    color: "#000",
    padding: 0,
    margin: 0,
    width: "460px",
  },
}))(Select);

const CustomCustomSelect = styled(CustomSelect)`
  .MuiSelect-iconOutlined {
    font-size: 50px;
    top: 12px;
  }
`;

const SelectContainer = styled.div`
  float: left;
  padding: 0 0 0 30px;
  width: 690px;

  margin: 20px auto 20px 30px;

  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
`;

const SelectLabel = styled.div`
  font-size: 28px;
  color: #303030;

  width: 145px;
  float: left;
  margin-top: 20px;
`;

const TheDepositButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  padding: 0px 10px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const CustomTabs = styled.div`
  font-size: 25px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 20px;
  padding: 10px 5px 5px 5px;
`;

const CustomTabText = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px 35px;
  background: #27273f;

  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
`;

const CustomTab = styled.div`
  color: #fff;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${CustomTabText} {
    ${({ selected, theme }) => {
      return selected && `background: ${theme.primary}`;
    }};
  }
`;

const CustomDatepicker = styled.div`
  background: #fff;
  border: solid 1px #fff;
  position: relative;
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};

  padding: 10px 20px;

  .MuiInputBase-input {
    background: none;
    font-size: 28px;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border-bottom: 0px;
  }
`;

const DateTimeDisplay = styled.div``;

const CalendarIcon = styled.div`
  mask: url(${process.env.PUBLIC_URL +
  "/assets/images/wapp/icons/calendar.svg"});
  background: #fff;
  height: 30px;
  width: 30px;
  mask-repeat: no-repeat;
  mask-size: 100%;
  position: absolute;
  right: 20px;
  top: 18px;
`;

const CustomWinLose = styled.span`
  color: ${({ value }) => {
    return value === 0 ? "" : value > 0 ? "rgb(3,189, 0)" : "rgb(255, 0, 0)";
  }};
`;

const CustomDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnotherCustomDataRow = styled.div`
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  padding-bottom: 20px;
`;

const FlatStraightLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-bottom: 20px;
`;

const CopyIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  mask: url(${process.env.PUBLIC_URL + `/assets/images/wapp/copy.png`})
    no-repeat center / contain;
  cursor: pointer;
`;

class Report extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    this.state = {
      selectedType:
        this.props.match.params.tab &&
        parseInt(this.props.match.params.tab) > 0 &&
        parseInt(this.props.match.params.tab) <= 8
          ? parseInt(this.props.match.params.tab)
          : 2,
      loading: false,

      dateFrom: today,
      dateTo: today,

      tab1: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        type: 0,
      },
      tab2: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        roundTotal: {},
        type: 0,
      },
      tab3: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        status: "",
      },
      tab4: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        status: "",
      },
      tab5: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab6: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab7: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab8: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },

      dateRange: 0,
      pageSize: 20,
      page: 1,
      type: 0,
      status: "",
      betType: 0,
      betType2: 0,
      dataList: [],
      gameList: [],
      isMaxPage: false,
      depositStatusList: {},
      withdrawalStatusList: {},
    };
  }

  theMenu = [
    {
      index: 2,
      label: i18n.t("report.bettingDetails"),
    },
    {
      index: 3,
      label: i18n.t("report.withdrawalDetails"),
    },
    {
      index: 4,
      label: i18n.t("report.depositDetails"),
    },
    {
      index: 6,
      label: i18n.t("common.transfer"),
    },
    {
      index: 8,
      label: i18n.t("report.balanceChanges.title"),
    },
    {
      index: 7,
      label: i18n.t("T13.report.joinedPromo.title"),
    },
  ];

  noTransfer = [
    {
      index: 2,
      label: i18n.t("report.bettingDetails"),
    },
    {
      index: 3,
      label: i18n.t("report.withdrawalDetails"),
    },
    {
      index: 4,
      label: i18n.t("report.depositDetails"),
    },
    {
      index: 8,
      label: i18n.t("report.balanceChanges.title"),
    },
    {
      index: 7,
      label: i18n.t("T13.report.joinedPromo.title"),
    },
  ];

  CTabs = (index, label) => {
    return (
      <CustomTab
        selected={index === this.state.selectedType}
        onClick={() => {
          this.handleChangeTab("", index);
        }}
      >
        <CustomTabText>{label}</CustomTabText>
      </CustomTab>
    );
  };

  componentDidMount() {
    this.GetDepositWithdrawalStatus();

    if (this.state.selectedType === 1) {
      this.handleAccountGetReportTrigger(this.state.page, this.state.type);
    } else if (this.state.selectedType === 2) {
      this.handleTransactionGetReportTrigger(this.state.page, this.state.type);
    } else if (this.state.selectedType === 3) {
      this.handleWithdrawalGetReportTrigger(this.state.page, this.state.status);
    } else if (this.state.selectedType === 4) {
      this.handleDepositGetReportTrigger(this.state.page, this.state.status);
    } else if (this.state.selectedType === 5) {
      this.handleRebateGetReportTrigger(this.state.page);
    } else if (this.state.selectedType === 6) {
      this.handleGetTransferReportTrigger(this.state.page);
    } else if (this.state.selectedType === 7) {
      this.handleGetJoinedPromo(this.state.page);
    } else if (this.state.selectedType === 8) {
      this.handleBalanceChanges(this.state.page);
    }
  }
  componentDidUpdate(preProps, preState) {
    if (this.state.selectedType === 1) {
      if (
        preState.type !== this.state.type ||
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleAccountGetReportTrigger(this.state.page, this.state.type);
      }
    } else if (this.state.selectedType === 2) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.type !== this.state.type ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleTransactionGetReportTrigger(
          this.state.page,
          this.state.type
        );
      }
    } else if (this.state.selectedType === 3) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.status !== this.state.status ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleWithdrawalGetReportTrigger(
          this.state.page,
          this.state.status
        );
      }
    } else if (this.state.selectedType === 4) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.status !== this.state.status ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleDepositGetReportTrigger(this.state.page, this.state.status);
      }
    } else if (this.state.selectedType === 5) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleRebateGetReportTrigger(this.state.page);
      }
    } else if (this.state.selectedType === 6) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleGetTransferReportTrigger(this.state.page);
      }
    } else if (this.state.selectedType === 7) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleGetJoinedPromo(this.state.page);
      }
    } else if (this.state.selectedType === 8) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleBalanceChanges(this.state.page);
      }
    }
  }
  GetGameList = () => {
    GameService.GetGameList(this.props.token).then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, gameList: response.data });
      }
    });
  };
  GetDepositWithdrawalStatus = () => {
    ReportService.GetDepositStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, depositStatusList: response.data });
      }
    });
    ReportService.GetWithdrawalStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, withdrawalStatusList: response.data });
      }
    });
  };
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleChangeTab = (e, newValue) => {
    let json = {};
    let setDateJson = {};

    if (this.state.selectedType !== newValue) {
      if (this.state.selectedType === 1) {
        json = {
          tab1: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            type: this.state.type,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 2) {
        json = {
          tab2: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            type: this.state.type,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 3) {
        json = {
          tab3: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            status: this.state.status,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 4) {
        json = {
          tab4: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            status: this.state.status,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 5) {
        json = {
          tab5: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 6) {
        json = {
          tab6: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 7) {
        json = {
          tab7: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 8) {
        json = {
          tab8: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      }
      if (newValue === 1) {
        setDateJson = {
          dateFrom: this.state.tab1.dateFrom,
          dateTo: this.state.tab1.dateTo,
          type: this.state.tab1.type,
          dateRange: this.state.tab1.dateRange,
        };
      } else if (newValue === 2) {
        setDateJson = {
          dateFrom: this.state.tab2.dateFrom,
          dateTo: this.state.tab2.dateTo,
          type: this.state.tab2.type,
          dateRange: this.state.tab1.dateRange,
        };
      } else if (newValue === 3) {
        setDateJson = {
          dateFrom: this.state.tab3.dateFrom,
          dateTo: this.state.tab3.dateTo,
          status: this.state.tab3.status,
          dateRange: this.state.tab3.dateRange,
        };
      } else if (newValue === 4) {
        setDateJson = {
          dateFrom: this.state.tab4.dateFrom,
          dateTo: this.state.tab4.dateTo,
          status: this.state.tab4.status,
          dateRange: this.state.tab4.dateRange,
        };
      } else if (newValue === 5) {
        setDateJson = {
          dateFrom: this.state.tab5.dateFrom,
          dateTo: this.state.tab5.dateTo,
          dateRange: this.state.tab5.dateRange,
        };
      } else if (newValue === 6) {
        setDateJson = {
          dateFrom: this.state.tab6.dateFrom,
          dateTo: this.state.tab6.dateTo,
          dateRange: this.state.tab6.dateRange,
        };
      } else if (newValue === 7) {
        setDateJson = {
          dateFrom: this.state.tab6.dateFrom,
          dateTo: this.state.tab6.dateTo,
          dateRange: this.state.tab6.dateRange,
        };
      } else if (newValue === 8) {
        setDateJson = {
          dateFrom: this.state.tab8.dateFrom,
          dateTo: this.state.tab8.dateTo,
          dateRange: this.state.tab8.dateRange,
        };
      }
      window.scrollTo({ top: 0 });
      this.setState({
        ...this.state,
        dataList: [],
        selectedType: newValue,
        page: 1,
        ...setDateJson,
        ...json,
      });
    }
  };

  handleWeeklyClick = () => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let newdateFrom = addDays(today, -7);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 1,
      dataList: [],
      isMaxPage: false,
      page: 1,
    });
  };
  handleMontlyClick = () => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let newdateFrom = addMonths(today, -1);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 2,
      dataList: [],
      isMaxPage: false,
      page: 1,
    });
  };
  handleTodayClick = (date) => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    this.setState({
      ...this.state,
      dateFrom: today,
      dateTo: today,
      dateRange: 0,
      dataList: [],
      isMaxPage: false,
      page: 1,
    });
  };
  handleDateFromChange = (e) => {
    this.setState({ ...this.state, dateFrom: e });
  };
  handleDateToChange = (e) => {
    this.setState({ ...this.state, dateTo: e });
  };
  handleAccountGetReportTrigger = (page, type) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetAccountDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,

      type
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.list)
            : response.data.list;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.count === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleTransactionGetReportTrigger = (page, game_platform_id) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetTransactionDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });

    config.features.Report_ShowRoundsTotal &&
      ReportService.GetRoundsTotal(
        moment(this.state.dateFrom).utc().format(),
        moment(this.state.dateTo).utc().add(1, "days").format()
      ).then((result) => {
        if (result.IsSuccess) {
          this.setState({
            ...this.state,
            tab2: {
              ...this.state.tab2,
              roundTotal: result.data,
            },
          });
        }
      });
  };
  handleWithdrawalGetReportTrigger = (page, status) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetWithdrawalDetails(
      status,
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleDepositGetReportTrigger = (page, status) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetDepositDetails(
      status,
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleRebateGetReportTrigger = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetRebateDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.list)
            : response.data.list;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.count === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleGetTransferReportTrigger = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetTransferReport(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      1,
      true,
      "BalanceTime",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleGetJoinedPromo = (page) => {
    this.setState({ ...this.state, loading: true });
    GeneralService.GetJoinedPromoReport(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      false,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleBalanceChanges = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetBalanceChanges(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalcount === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleTypeChange = (e) => {
    this.setState({ ...this.state, type: e.target.value, page: 1 });
  };
  handleStatusChange = (e) => {
    this.setState({ ...this.state, status: e.target.value, page: 1 });
  };

  handleScrollBottom = () => {
    if (this.state.isMaxPage === false) {
      this.setState({
        ...this.state,
        page: this.state.page + 1,
        loading: true,
      });
    }
  };

  handleManualDeposit = (id) => {
    this.props.appHistory.push({
      pathname: "/manual/" + id,
    });
  };

  gpNameSwitcher = ({ gameProviderCode, gameProviderName, from, to }, type) => {
    let label = "";
    switch (type) {
      case "gp":
        label = gameProviderName;
        break;
      case "from":
        label = from;
        break;
      case "to":
        label = to;
        break;
      default:
        break;
    }
    if (
      type === "gp" &&
      gameProviderCode &&
      gameProviderCode.toString().toUpperCase() === "WGFM"
    ) {
      if (config.brand === "TIGER")
        label = gameProviderName.toString().replace("WG", "Tiger");
    }
    if (
      type === "from" &&
      from &&
      from.toString().toUpperCase() === "WG SPORTS"
    ) {
      if (config.brand === "TIGER")
        label = from.toString().replace("WG", "Tiger");
    }
    if (type === "to" && to && to.toString().toUpperCase() === "WG SPORTS") {
      if (config.brand === "TIGER")
        label = to.toString().replace("WG", "Tiger");
    }
    //if currency is PHP, change BTI to PHSB
    return config.currency === "PHP" && label === "BTI" ? "PHSB" : label;
  };

  getDateFromMinDate = () => {
    switch (this.state.selectedType) {
      case 8:
        return addDays(new Date(this.state.dateTo), -44);
      default:
        return undefined;
    }
  };

  getDateToMaxDate = () => {
    switch (this.state.selectedType) {
      case 8:
        return addDays(new Date(this.state.dateTo), 44) > new Date()
          ? new Date()
          : addDays(new Date(this.state.dateTo), 44);
      default:
        return new Date();
    }
  };

  performCopy = (content) => {
    this.props.alert("", i18n.t("affiliate.copied"));

    utility.copy(content);
  };

  render() {
    const NoDataPlaceholder = () => {
      return (
        <NoRecordContainer>
          <NoRecordImage
            src={process.env.PUBLIC_URL + `/assets/images/wapp/no-record.png`}
          />

          <NoRecordText>{i18n.t("common.nodata")}</NoRecordText>
        </NoRecordContainer>
      );
    };
    return (
      <Container>
        <StyledAppBar>
          <Header
            onBackClick={this.handleBackClick}
            title={(() => {
              switch (this.state.selectedType) {
                case 1:
                  return i18n.t("report.transferDetails");
                case 2:
                  return i18n.t("report.bettingDetails");
                case 3:
                  return i18n.t("report.withdrawalDetails");
                case 4:
                  return i18n.t("report.depositDetails");
                case 5:
                  return;
                case 6:
                  return i18n.t("report.transfer.title");
                case 7:
                  return i18n.t("report.joinedPromo.title");
                case 8:
                  return i18n.t("report.balanceChanges.title");
                default:
                  return i18n.t("report.rebateDetails");
              }
            })()}
            backgroundColor={"transparent"}
          ></Header>
        </StyledAppBar>
        <CustomTabs>
          {(this.props.game.containTransferWallet
            ? this.theMenu
            : this.noTransfer
          ).map((data, index) => {
            return this.CTabs(data.index, data.label);
          })}
        </CustomTabs>

        <DateContainer>
          <DatePickerTitle>{i18n.t("report.date")}</DatePickerTitle>
          <FlatStraightLine>
            <DateInner>
              <CustomDatepicker>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  locale={localeMap[i18n.language.substring(0, 2)]}
                >
                  <DatePicker
                    autoOk
                    clearable
                    disableFuture
                    minDate={this.getDateFromMinDate()}
                    maxDate={new Date(this.state.dateTo)}
                    format="yyyy/MM/dd"
                    value={this.state.dateFrom}
                    onChange={this.handleDateFromChange}
                  />
                </MuiPickersUtilsProvider>
                <CalendarIcon />
              </CustomDatepicker>
            </DateInner>
            <DateSpliter>-</DateSpliter>
            <DateInner>
              <CustomDatepicker>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  locale={localeMap[i18n.language.substring(0, 2)]}
                >
                  <DatePicker
                    autoOk
                    clearable
                    disableFuture
                    minDate={new Date(this.state.dateFrom)}
                    maxDate={this.getDateToMaxDate()}
                    format="yyyy/MM/dd"
                    value={this.state.dateTo}
                    onChange={this.handleDateToChange}
                  />
                </MuiPickersUtilsProvider>{" "}
                <CalendarIcon />
              </CustomDatepicker>
            </DateInner>
          </FlatStraightLine>
          <div className="clear"></div>
          <DateRangContainer>
            <DateRangSelection
              onClick={this.handleTodayClick}
              selected={this.state.dateRange === 0}
            >
              {i18n.t("report.today")}
            </DateRangSelection>
            <DateRangSelection
              selected={this.state.dateRange === 1}
              onClick={this.handleWeeklyClick}
            >
              {i18n.t("report.oneWeek")}
            </DateRangSelection>
            <DateRangSelection
              selected={this.state.dateRange === 2}
              onClick={this.handleMontlyClick}
            >
              {i18n.t("report.oneMonth")}
            </DateRangSelection>
          </DateRangContainer>
        </DateContainer>
        {(() => {
          if (this.state.selectedType === 1) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.platform")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomCustomSelect
                    native
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                  >
                    <option value={0}>{i18n.t("report.all")}</option>

                    {(() => {
                      return this.state.gameList.map((row) => {
                        return (
                          <option value={row.id} key={row.id}>
                            {row.name}
                          </option>
                        );
                      });
                    })()}
                  </CustomCustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          } else if (this.state.selectedType === 3) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.status")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomCustomSelect
                    native
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                  >
                    <option value={""}>{i18n.t("report.all")}</option>

                    {Object.keys(this.state.withdrawalStatusList).map((key) => {
                      return (
                        <option value={key}>
                          {i18n.t(`report.withdrawal.status${key}`)}
                        </option>
                      );
                    })}
                  </CustomCustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          } else if (this.state.selectedType === 4) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.status")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomCustomSelect
                    native
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                  >
                    <option value={""}>{i18n.t("report.all")}</option>
                    {Object.keys(this.state.depositStatusList).map((key) => {
                      return (
                        <option value={key}>
                          {i18n.t(`report.deposit.status${key}`)}
                        </option>
                      );
                    })}
                  </CustomCustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          }
        })()}

        {(() => {
          if (this.state.selectedType === 1) {
            return (
              <React.Fragment>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell>{i18n.t("report.submitDate")}</DataDateCell>
                    <DataWinlossCell>{i18n.t("report.status")}</DataWinlossCell>
                    <DataWinlossCell>
                      {i18n.t("report.transferOut")}
                      <br />
                      {i18n.t("report.transferIn")}
                    </DataWinlossCell>

                    <DataWinlossCell>{i18n.t("common.amount")}</DataWinlossCell>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoDataPlaceholder />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <DataRow key={index}>
                              <DataDateCell>
                                {moment(row.create_time_text).format(
                                  "YYYY-MM-DD hh:mm a"
                                )}
                              </DataDateCell>
                              <DataDateCell>{row.status_text}</DataDateCell>
                              <DataDateCell>
                                {row.transform_out}
                                <br />
                                {row.transform_in}
                              </DataDateCell>

                              <DataDateCell>{row.amount_text}</DataDateCell>
                            </DataRow>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 2) {
            return (
              <React.Fragment>
                {(() => {
                  if (config.features.Report_ShowRoundsTotal) {
                    if (
                      this.state.tab2.roundTotal &&
                      (this.state.tab2.roundTotal.betAmount ||
                        this.state.tab2.roundTotal.validBetAmount ||
                        this.state.tab2.roundTotal.validBetAmount)
                    ) {
                      return (
                        <DataContent
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                          }}
                        >
                          <div style={{ textAlign: "left" }}>
                            {this.state.tab2.roundTotal &&
                              i18n.t("report.totalBetAmount") +
                                ": " +
                                this.state.tab2.roundTotal.betAmount}
                          </div>
                          <div style={{ textAlign: "left" }}>
                            {this.state.tab2.roundTotal &&
                              i18n.t("report.totalValidBet") +
                                ": " +
                                this.state.tab2.roundTotal.validBetAmount}
                          </div>
                          <div style={{ textAlign: "left" }}>
                            {i18n.t("report.totalWinLose") + ": "}
                            <CustomWinLose
                              value={
                                this.state.tab2.roundTotal &&
                                this.state.tab2.roundTotal.winLoss
                              }
                            >
                              {this.state.tab2.roundTotal &&
                                this.state.tab2.roundTotal.winLoss}
                            </CustomWinLose>
                          </div>
                        </DataContent>
                      );
                    }
                  }
                })()}
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoDataPlaceholder />;
                  } else {
                    return (
                      <>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <DataContent key={index}>
                              <DataRowId>
                                {i18n.t("report.betid")}:
                                <IDCell
                                  onClick={() => {
                                    this.performCopy(row.id);
                                  }}
                                >
                                  {" "}
                                  {row.id}
                                  <CopyIcon />
                                </IDCell>
                              </DataRowId>
                              <DataRowId>
                                <CustomDataRow>
                                  <IDCell>
                                    {this.gpNameSwitcher(row, "gp")} -{" "}
                                    {row.gameName}
                                  </IDCell>
                                  <IDCell> {date}</IDCell>
                                </CustomDataRow>
                              </DataRowId>
                              <DataRowId>
                                <AnotherCustomDataRow>
                                  <IDCell>
                                    {i18n.t("report.betAmount")} :
                                    {row.betAmount}
                                  </IDCell>{" "}
                                  <IDCell>
                                    {i18n.t("report.validBet")} :
                                    {row.validBetAmount}
                                  </IDCell>{" "}
                                  <IDCell>
                                    {i18n.t("report.winloss")} :
                                    <CustomWinLose value={row.winLoss}>
                                      {row.winLoss}
                                    </CustomWinLose>
                                  </IDCell>
                                </AnotherCustomDataRow>
                              </DataRowId>
                            </DataContent>
                          );
                        })}
                      </>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 3) {
            return (
              <React.Fragment>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell3>{i18n.t("report.dateTime")}</DataDateCell3>

                    <DataDateCell3>{i18n.t("report.status")}</DataDateCell3>
                    <DataDateCellAmount>
                      {i18n.t("common.amount")}
                    </DataDateCellAmount>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoDataPlaceholder />;
                  } else {
                    return (
                      <>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdon).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <DataContent key={index}>
                              <DataRowId>
                                {i18n.t("report.NewOrderNumber")} :{" "}
                                <IDCell>{row.orderno}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DataDateCell3>{date}</DataDateCell3>
                                <DataDateCell3>
                                  {i18n.t(
                                    `report.withdrawal.status${row.status}`
                                  )}
                                </DataDateCell3>
                                <DataDateCellAmount>
                                  {row.amount}
                                </DataDateCellAmount>
                              </DataRow>
                            </DataContent>
                          );
                        })}
                      </>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 4) {
            return (
              <React.Fragment>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoDataPlaceholder />;
                  } else {
                    return (
                      <>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdon).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <DataContent key={index}>
                              <DataRowId>
                                {i18n.t("report.NewOrderNumber")} :{" "}
                                <IDCell>{row.orderno}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DataDateCell3></DataDateCell3>
                                <DataDateCell3>
                                  {i18n.t(`report.deposit.status${row.status}`)}
                                </DataDateCell3>
                                <DataDateCell3>{row.amount}</DataDateCell3>
                                <DataDateCellAmount>
                                  {row.status === 1 &&
                                    row.canuploadcerts === true && (
                                      <TheDepositButton
                                        onClick={() => {
                                          this.handleManualDeposit(row.id);
                                        }}
                                      >
                                        {i18n.t("deposit.uploadReceipt")}
                                      </TheDepositButton>
                                    )}
                                </DataDateCellAmount>
                                <DataRowId>
                                  <DateTimeDisplay>{date}</DateTimeDisplay>
                                </DataRowId>
                              </DataRow>
                            </DataContent>
                          );
                        })}
                      </>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 5) {
            return (
              <React.Fragment>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell>{i18n.t("report.rebate.sn")}</DataDateCell>
                    <DataDateCell>
                      {i18n.t("report.rebate.cycleDate")}
                    </DataDateCell>
                    <DataDateCell>{i18n.t("report.status")}</DataDateCell>
                    <DataDateCell style={{ "text-align": "right" }}>
                      {i18n.t("report.rebate.validBet")}
                      <br />
                      {i18n.t("report.rebate.amount")}
                    </DataDateCell>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoDataPlaceholder />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <DataRow key={index}>
                              <DataDateCell>{row.sn}</DataDateCell>
                              <DataDateCell>{row.date}</DataDateCell>
                              <DataDateCell>{row.status_text}</DataDateCell>
                              <DataDateCell style={{ "text-align": "right" }}>
                                {row.bet_valid_text}
                                <br />
                                {row.rebate_amount_text}
                              </DataDateCell>
                            </DataRow>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 6) {
            return (
              <React.Fragment>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoDataPlaceholder />;
                  } else {
                    return (
                      <div>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <DataContent key={index}>
                              <DataRowId>
                                {i18n.t("report.transfer.table.from")} :{" "}
                                <IDCell>
                                  {this.gpNameSwitcher(row, "from")}
                                </IDCell>
                              </DataRowId>
                              <DataRowId>
                                {i18n.t("report.transfer.table.to")} :{" "}
                                <IDCell>
                                  {this.gpNameSwitcher(row, "to")}
                                </IDCell>
                              </DataRowId>
                              <DataRowId>
                                {i18n.t("report.amount")} :{" "}
                                <IDCell>{row.amount}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DateTimeDisplay>
                                  {moment(row.balancetime).format(
                                    "YYYY-MM-DD hh:mm a"
                                  )}
                                </DateTimeDisplay>
                              </DataRow>
                            </DataContent>
                          );
                        })}
                      </div>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 7) {
            return (
              <React.Fragment>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoDataPlaceholder />;
                  } else {
                    return (
                      <div>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.joinedOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <DataContent key={index}>
                              <DataRow>
                                <DataRowId>
                                  {i18n.t("report.dateTime")} :{" "}
                                  <IDCell>{date}</IDCell>
                                </DataRowId>
                                <DataRowId>
                                  {i18n.t("report.joinedPromo.promoName")}:{" "}
                                  <IDCell>{row.promotionName}</IDCell>
                                </DataRowId>
                              </DataRow>
                            </DataContent>
                          );
                        })}
                      </div>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 8) {
            return (
              <React.Fragment>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoDataPlaceholder />;
                  } else {
                    return (
                      <div>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.recordedon).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <DataContent key={index}>
                              <DataRow>
                                <DataRowId>
                                  {i18n.t("report.dateTime")} :{" "}
                                  <IDCell>{date}</IDCell>
                                </DataRowId>
                                <DataRowId>
                                  {i18n.t("report.balanceChanges.type")}:{" "}
                                  <IDCell>
                                    {ErrorSwitcher.getTranslation(row.type)}
                                  </IDCell>
                                </DataRowId>
                                <DataRowId>
                                  {i18n.t("report.balanceChanges.amount")}:{" "}
                                  <IDCell>{row.amount}</IDCell>
                                </DataRowId>
                              </DataRow>
                            </DataContent>
                          );
                        })}
                      </div>
                    );
                  }
                })()}
              </React.Fragment>
            );
          }
        })()}
        <BottomScrollListener onBottom={this.handleScrollBottom} />
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Report));
