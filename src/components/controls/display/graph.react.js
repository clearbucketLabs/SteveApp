var react = require('react');



/*


Chart X, Y
      x1,y2


Temperal Data:

Data > Parser

Data Cache > State / Props
Data Store > Save historical data

Data grouping, Sorting: From Store

Response > Parse > HasControl > Data Transform[controlID] > Map to Props


Responses are checked/parsed and matched based on configuration rules.
Stored Asynchronously to some data store
The Mapper checks if there is a control for this data
Mapper Notifies Control there is data available for it.
Control Asks the Mapper for the data to render.

Mapper can have rules on how the data can be sent to the control, such as grouping, sorting and filtering keeping the control
to only it's UI Role.

Interface > Device Event > GotData to DataStore > parse data > Save & Notify Mapper >     


*/
