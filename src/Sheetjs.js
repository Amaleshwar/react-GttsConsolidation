
import React from 'react';
import ReactDOM from 'react-dom';

import XLSX from 'xlsx';



export default  class Sheetjs extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
			cols: []  /* Array of column objects e.g. { name: "C", K: 2 } */
		};
		this.exportFile = this.exportFile.bind(this);
	};

		

	exportFile() {
		/* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(this.props.exceldata);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx")
	};
	render() {    return (
<div>
	<div className="row"><div className="col-xs-12">
		<button disabled={!this.props.exceldata.length} className="btn btn-success" onClick={this.exportFile}>Export</button>
	</div></div>
	{/* <div className="row" style={{overflow:"auto"}}><div className="col-xs-12">
    <div className="table-responsive">
	<table className="table table-striped">
	
		<tbody>
			{this.props.exceldata.map((row,i) => <tr key={i}>
				{this.props.keys.map((key,j) => <td key={j}>{ row[j] }</td>)}
			</tr>)}
		</tbody>
	</table>
</div>
	</div></div> */}
</div>
); };
};