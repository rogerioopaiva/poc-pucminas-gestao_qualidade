import React from "react";
import { Calendar } from "@bit/primefaces.primereact.calendar";
import PrimereactStyle from "@bit/primefaces.primereact.internal.stylelinks";


class Calendar extends React.Component {

  constructor() {
    super();

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;

    this.state = {
      
      date3: null,

    };

    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);

    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    this.invalidDates = [today];

    this.dateTemplate = this.dateTemplate.bind(this);
  }

  dateTemplate(date) {
    if (date.day > 10 && date.day < 15) {
      return (
        <div
          style={{
            backgroundColor: "#1dcbb3",
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: "50%",
            width: "2em",
            height: "2em",
            lineHeight: "2em",
            padding: 0,
          }}
        >
          {date.day}
        </div>
      );
    } else {
      return date.day;
    }
  }

  render() {
    const pt = {
      firstDayOfWeek: 1,
      dayNames: [
        "domingo",
        "segunda",
        "terça",
        "quarta",
        "quinta",
        "sexta",
        "sábado",
      ],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ],
      monthNamesShort: [
        "jan",
        "feb",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
      ],
    };

    return (
        <div style={{ width: 400, height: 500 }}/>
			<PrimereactStyle />
            <div className="inputgrid-demo">
                <div className="p-grid p-fluid">
                <div className="p-col-12 p-md-4">
                    <h3>Icon</h3>
                    <Calendar
                    value={this.state.date3}
                    onChange={(e) => this.setState({ date3: e.value })}
                    showIcon={true}
                    locale={pt}
                    dateFormat="dd/mm/yy"
                    touchUI={true}
                    />
                </div>
            </div>
      </div>
    );
  }
}

export default <Calendar />;