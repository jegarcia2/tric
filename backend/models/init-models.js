var DataTypes = require("sequelize").DataTypes;
var _accountingperiods = require("./accountingperiods");
var _auditlogs = require("./auditlogs");
var _chartofaccounts = require("./chartofaccounts");
var _clientcontacts = require("./clientcontacts");
var _clients = require("./clients");
var _companyinfo = require("./companyinfo");
var _departments = require("./departments");
var _discounts = require("./discounts");
var _employees = require("./employees");
var _fiscalyears = require("./fiscalyears");
var _fixedassets = require("./fixedassets");
var _goodsreceiptlines = require("./goodsreceiptlines");
var _goodsreceipts = require("./goodsreceipts");
var _inventory = require("./inventory");
var _invoices = require("./invoices");
var _journalentries = require("./journalentries");
var _journallines = require("./journallines");
var _paymentmethods = require("./paymentmethods");
var _payments = require("./payments");
var _payrollperiods = require("./payrollperiods");
var _payrolls = require("./payrolls");
var _permissions = require("./permissions");
var _productcategories = require("./productcategories");
var _productprices = require("./productprices");
var _products = require("./products");
var _purchaseorderlines = require("./purchaseorderlines");
var _purchaseorders = require("./purchaseorders");
var _reporttemplates = require("./reporttemplates");
var _returnlines = require("./returnlines");
var _returns = require("./returns");
var _roles = require("./roles");
var _salesorderdiscounts = require("./salesorderdiscounts");
var _salesorderlines = require("./salesorderlines");
var _salesorders = require("./salesorders");
var _scheduledreports = require("./scheduledreports");
var _statuses = require("./statuses");
var _suppliercategories = require("./suppliercategories");
var _suppliercontacts = require("./suppliercontacts");
var _supplierinvoicelines = require("./supplierinvoicelines");
var _supplierinvoices = require("./supplierinvoices");
var _suppliers = require("./suppliers");
var _systemsettings = require("./systemsettings");
var _taxcodes = require("./taxcodes");
var _units = require("./units");
var _userpermissions = require("./userpermissions");
var _userroles = require("./userroles");
var _users = require("./users");
var _warehouses = require("./warehouses");

function initModels(sequelize) {
  var accountingperiods = _accountingperiods(sequelize, DataTypes);
  var auditlogs = _auditlogs(sequelize, DataTypes);
  var chartofaccounts = _chartofaccounts(sequelize, DataTypes);
  var clientcontacts = _clientcontacts(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var companyinfo = _companyinfo(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var discounts = _discounts(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var fiscalyears = _fiscalyears(sequelize, DataTypes);
  var fixedassets = _fixedassets(sequelize, DataTypes);
  var goodsreceiptlines = _goodsreceiptlines(sequelize, DataTypes);
  var goodsreceipts = _goodsreceipts(sequelize, DataTypes);
  var inventory = _inventory(sequelize, DataTypes);
  var invoices = _invoices(sequelize, DataTypes);
  var journalentries = _journalentries(sequelize, DataTypes);
  var journallines = _journallines(sequelize, DataTypes);
  var paymentmethods = _paymentmethods(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var payrollperiods = _payrollperiods(sequelize, DataTypes);
  var payrolls = _payrolls(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var productcategories = _productcategories(sequelize, DataTypes);
  var productprices = _productprices(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var purchaseorderlines = _purchaseorderlines(sequelize, DataTypes);
  var purchaseorders = _purchaseorders(sequelize, DataTypes);
  var reporttemplates = _reporttemplates(sequelize, DataTypes);
  var returnlines = _returnlines(sequelize, DataTypes);
  var returns = _returns(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var salesorderdiscounts = _salesorderdiscounts(sequelize, DataTypes);
  var salesorderlines = _salesorderlines(sequelize, DataTypes);
  var salesorders = _salesorders(sequelize, DataTypes);
  var scheduledreports = _scheduledreports(sequelize, DataTypes);
  var statuses = _statuses(sequelize, DataTypes);
  var suppliercategories = _suppliercategories(sequelize, DataTypes);
  var suppliercontacts = _suppliercontacts(sequelize, DataTypes);
  var supplierinvoicelines = _supplierinvoicelines(sequelize, DataTypes);
  var supplierinvoices = _supplierinvoices(sequelize, DataTypes);
  var suppliers = _suppliers(sequelize, DataTypes);
  var systemsettings = _systemsettings(sequelize, DataTypes);
  var taxcodes = _taxcodes(sequelize, DataTypes);
  var units = _units(sequelize, DataTypes);
  var userpermissions = _userpermissions(sequelize, DataTypes);
  var userroles = _userroles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var warehouses = _warehouses(sequelize, DataTypes);

  invoices.belongsTo(accountingperiods, { as: "accountingPeriod", foreignKey: "accountingPeriodId"});
  accountingperiods.hasMany(invoices, { as: "invoices", foreignKey: "accountingPeriodId"});
  journalentries.belongsTo(accountingperiods, { as: "accountingPeriod", foreignKey: "accountingPeriodId"});
  accountingperiods.hasMany(journalentries, { as: "journalentries", foreignKey: "accountingPeriodId"});
  payments.belongsTo(accountingperiods, { as: "accountingPeriod", foreignKey: "accountingPeriodId"});
  accountingperiods.hasMany(payments, { as: "payments", foreignKey: "accountingPeriodId"});
  purchaseorders.belongsTo(accountingperiods, { as: "accountingPeriod", foreignKey: "accountingPeriodId"});
  accountingperiods.hasMany(purchaseorders, { as: "purchaseorders", foreignKey: "accountingPeriodId"});
  salesorders.belongsTo(accountingperiods, { as: "accountingPeriod", foreignKey: "accountingPeriodId"});
  accountingperiods.hasMany(salesorders, { as: "salesorders", foreignKey: "accountingPeriodId"});
  supplierinvoices.belongsTo(accountingperiods, { as: "accountingPeriod", foreignKey: "accountingPeriodId"});
  accountingperiods.hasMany(supplierinvoices, { as: "supplierinvoices", foreignKey: "accountingPeriodId"});
  chartofaccounts.belongsTo(chartofaccounts, { as: "parentAccount", foreignKey: "parentAccountId"});
  chartofaccounts.hasMany(chartofaccounts, { as: "chartofaccounts", foreignKey: "parentAccountId"});
  journallines.belongsTo(chartofaccounts, { as: "account", foreignKey: "accountId"});
  chartofaccounts.hasMany(journallines, { as: "journallines", foreignKey: "accountId"});
  clientcontacts.belongsTo(clients, { as: "client", foreignKey: "clientId"});
  clients.hasMany(clientcontacts, { as: "clientcontacts", foreignKey: "clientId"});
  productprices.belongsTo(clients, { as: "client", foreignKey: "clientId"});
  clients.hasMany(productprices, { as: "productprices", foreignKey: "clientId"});
  salesorders.belongsTo(clients, { as: "client", foreignKey: "clientId"});
  clients.hasMany(salesorders, { as: "salesorders", foreignKey: "clientId"});
  employees.belongsTo(departments, { as: "department", foreignKey: "departmentId"});
  departments.hasMany(employees, { as: "employees", foreignKey: "departmentId"});
  salesorderdiscounts.belongsTo(discounts, { as: "discount", foreignKey: "discountId"});
  discounts.hasMany(salesorderdiscounts, { as: "salesorderdiscounts", foreignKey: "discountId"});
  payrolls.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(payrolls, { as: "payrolls", foreignKey: "employeeId"});
  accountingperiods.belongsTo(fiscalyears, { as: "fiscalYear", foreignKey: "fiscalYearId"});
  fiscalyears.hasMany(accountingperiods, { as: "accountingperiods", foreignKey: "fiscalYearId"});
  invoices.belongsTo(fiscalyears, { as: "fiscalYear", foreignKey: "fiscalYearId"});
  fiscalyears.hasMany(invoices, { as: "invoices", foreignKey: "fiscalYearId"});
  journalentries.belongsTo(fiscalyears, { as: "fiscalYear", foreignKey: "fiscalYearId"});
  fiscalyears.hasMany(journalentries, { as: "journalentries", foreignKey: "fiscalYearId"});
  payments.belongsTo(fiscalyears, { as: "fiscalYear", foreignKey: "fiscalYearId"});
  fiscalyears.hasMany(payments, { as: "payments", foreignKey: "fiscalYearId"});
  purchaseorders.belongsTo(fiscalyears, { as: "fiscalYear", foreignKey: "fiscalYearId"});
  fiscalyears.hasMany(purchaseorders, { as: "purchaseorders", foreignKey: "fiscalYearId"});
  salesorders.belongsTo(fiscalyears, { as: "fiscalYear", foreignKey: "fiscalYearId"});
  fiscalyears.hasMany(salesorders, { as: "salesorders", foreignKey: "fiscalYearId"});
  supplierinvoices.belongsTo(fiscalyears, { as: "fiscalYear", foreignKey: "fiscalYearId"});
  fiscalyears.hasMany(supplierinvoices, { as: "supplierinvoices", foreignKey: "fiscalYearId"});
  goodsreceiptlines.belongsTo(goodsreceipts, { as: "goodsReceipt", foreignKey: "goodsReceiptId"});
  goodsreceipts.hasMany(goodsreceiptlines, { as: "goodsreceiptlines", foreignKey: "goodsReceiptId"});
  invoices.belongsTo(journalentries, { as: "journalEntry", foreignKey: "journalEntryId"});
  journalentries.hasMany(invoices, { as: "invoices", foreignKey: "journalEntryId"});
  journallines.belongsTo(journalentries, { as: "journalEntry", foreignKey: "journalEntryId"});
  journalentries.hasMany(journallines, { as: "journallines", foreignKey: "journalEntryId"});
  payments.belongsTo(journalentries, { as: "journalEntry", foreignKey: "journalEntryId"});
  journalentries.hasMany(payments, { as: "payments", foreignKey: "journalEntryId"});
  purchaseorders.belongsTo(journalentries, { as: "journalEntry", foreignKey: "journalEntryId"});
  journalentries.hasMany(purchaseorders, { as: "purchaseorders", foreignKey: "journalEntryId"});
  salesorders.belongsTo(journalentries, { as: "journalEntry", foreignKey: "journalEntryId"});
  journalentries.hasMany(salesorders, { as: "salesorders", foreignKey: "journalEntryId"});
  supplierinvoices.belongsTo(journalentries, { as: "journalEntry", foreignKey: "journalEntryId"});
  journalentries.hasMany(supplierinvoices, { as: "supplierinvoices", foreignKey: "journalEntryId"});
  payments.belongsTo(paymentmethods, { as: "paymentMethod", foreignKey: "paymentMethodId"});
  paymentmethods.hasMany(payments, { as: "payments", foreignKey: "paymentMethodId"});
  payrolls.belongsTo(paymentmethods, { as: "paymentMethod", foreignKey: "paymentMethodId"});
  paymentmethods.hasMany(payrolls, { as: "payrolls", foreignKey: "paymentMethodId"});
  payrolls.belongsTo(payrollperiods, { as: "payrollPeriod", foreignKey: "payrollPeriodId"});
  payrollperiods.hasMany(payrolls, { as: "payrolls", foreignKey: "payrollPeriodId"});
  userpermissions.belongsTo(permissions, { as: "permission", foreignKey: "permissionId"});
  permissions.hasMany(userpermissions, { as: "userpermissions", foreignKey: "permissionId"});
  products.belongsTo(productcategories, { as: "category", foreignKey: "categoryId"});
  productcategories.hasMany(products, { as: "products", foreignKey: "categoryId"});
  inventory.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(inventory, { as: "inventories", foreignKey: "productId"});
  productprices.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(productprices, { as: "productprices", foreignKey: "productId"});
  purchaseorderlines.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(purchaseorderlines, { as: "purchaseorderlines", foreignKey: "productId"});
  returnlines.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(returnlines, { as: "returnlines", foreignKey: "productId"});
  salesorderlines.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(salesorderlines, { as: "salesorderlines", foreignKey: "productId"});
  goodsreceiptlines.belongsTo(purchaseorderlines, { as: "purchaseOrderLine", foreignKey: "purchaseOrderLineId"});
  purchaseorderlines.hasMany(goodsreceiptlines, { as: "goodsreceiptlines", foreignKey: "purchaseOrderLineId"});
  supplierinvoicelines.belongsTo(purchaseorderlines, { as: "purchaseOrderLine", foreignKey: "purchaseOrderLineId"});
  purchaseorderlines.hasMany(supplierinvoicelines, { as: "supplierinvoicelines", foreignKey: "purchaseOrderLineId"});
  goodsreceipts.belongsTo(purchaseorders, { as: "purchaseOrder", foreignKey: "purchaseOrderId"});
  purchaseorders.hasMany(goodsreceipts, { as: "goodsreceipts", foreignKey: "purchaseOrderId"});
  purchaseorderlines.belongsTo(purchaseorders, { as: "purchaseOrder", foreignKey: "purchaseOrderId"});
  purchaseorders.hasMany(purchaseorderlines, { as: "purchaseorderlines", foreignKey: "purchaseOrderId"});
  supplierinvoices.belongsTo(purchaseorders, { as: "purchaseOrder", foreignKey: "purchaseOrderId"});
  purchaseorders.hasMany(supplierinvoices, { as: "supplierinvoices", foreignKey: "purchaseOrderId"});
  scheduledreports.belongsTo(reporttemplates, { as: "reportTemplate", foreignKey: "reportTemplateId"});
  reporttemplates.hasMany(scheduledreports, { as: "scheduledreports", foreignKey: "reportTemplateId"});
  returnlines.belongsTo(returns, { as: "return", foreignKey: "returnId"});
  returns.hasMany(returnlines, { as: "returnlines", foreignKey: "returnId"});
  userroles.belongsTo(roles, { as: "role", foreignKey: "roleId"});
  roles.hasMany(userroles, { as: "userroles", foreignKey: "roleId"});
  invoices.belongsTo(salesorders, { as: "salesOrder", foreignKey: "salesOrderId"});
  salesorders.hasMany(invoices, { as: "invoices", foreignKey: "salesOrderId"});
  payments.belongsTo(salesorders, { as: "salesOrder", foreignKey: "salesOrderId"});
  salesorders.hasMany(payments, { as: "payments", foreignKey: "salesOrderId"});
  returns.belongsTo(salesorders, { as: "salesOrder", foreignKey: "salesOrderId"});
  salesorders.hasMany(returns, { as: "returns", foreignKey: "salesOrderId"});
  salesorderdiscounts.belongsTo(salesorders, { as: "salesOrder", foreignKey: "salesOrderId"});
  salesorders.hasMany(salesorderdiscounts, { as: "salesorderdiscounts", foreignKey: "salesOrderId"});
  salesorderlines.belongsTo(salesorders, { as: "salesOrder", foreignKey: "salesOrderId"});
  salesorders.hasMany(salesorderlines, { as: "salesorderlines", foreignKey: "salesOrderId"});
  clients.belongsTo(statuses, { as: "status", foreignKey: "statusId"});
  statuses.hasMany(clients, { as: "clients", foreignKey: "statusId"});
  employees.belongsTo(statuses, { as: "status", foreignKey: "statusId"});
  statuses.hasMany(employees, { as: "employees", foreignKey: "statusId"});
  invoices.belongsTo(statuses, { as: "status", foreignKey: "statusId"});
  statuses.hasMany(invoices, { as: "invoices", foreignKey: "statusId"});
  payrollperiods.belongsTo(statuses, { as: "status", foreignKey: "statusId"});
  statuses.hasMany(payrollperiods, { as: "payrollperiods", foreignKey: "statusId"});
  purchaseorders.belongsTo(statuses, { as: "status", foreignKey: "statusId"});
  statuses.hasMany(purchaseorders, { as: "purchaseorders", foreignKey: "statusId"});
  salesorders.belongsTo(statuses, { as: "status", foreignKey: "statusId"});
  statuses.hasMany(salesorders, { as: "salesorders", foreignKey: "statusId"});
  supplierinvoices.belongsTo(statuses, { as: "status", foreignKey: "statusId"});
  statuses.hasMany(supplierinvoices, { as: "supplierinvoices", foreignKey: "statusId"});
  suppliers.belongsTo(suppliercategories, { as: "category", foreignKey: "categoryId"});
  suppliercategories.hasMany(suppliers, { as: "suppliers", foreignKey: "categoryId"});
  supplierinvoicelines.belongsTo(supplierinvoices, { as: "supplierInvoice", foreignKey: "supplierInvoiceId"});
  supplierinvoices.hasMany(supplierinvoicelines, { as: "supplierinvoicelines", foreignKey: "supplierInvoiceId"});
  purchaseorders.belongsTo(suppliers, { as: "supplier", foreignKey: "supplierId"});
  suppliers.hasMany(purchaseorders, { as: "purchaseorders", foreignKey: "supplierId"});
  suppliercontacts.belongsTo(suppliers, { as: "supplier", foreignKey: "supplierId"});
  suppliers.hasMany(suppliercontacts, { as: "suppliercontacts", foreignKey: "supplierId"});
  products.belongsTo(units, { as: "unit", foreignKey: "unitId"});
  units.hasMany(products, { as: "products", foreignKey: "unitId"});
  auditlogs.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(auditlogs, { as: "auditlogs", foreignKey: "userId"});
  clients.belongsTo(users, { as: "createdBy_user", foreignKey: "createdBy"});
  users.hasMany(clients, { as: "clients", foreignKey: "createdBy"});
  clients.belongsTo(users, { as: "updatedBy_user", foreignKey: "updatedBy"});
  users.hasMany(clients, { as: "updatedBy_clients", foreignKey: "updatedBy"});
  goodsreceipts.belongsTo(users, { as: "receivedBy_user", foreignKey: "receivedBy"});
  users.hasMany(goodsreceipts, { as: "goodsreceipts", foreignKey: "receivedBy"});
  journalentries.belongsTo(users, { as: "createdBy_user", foreignKey: "createdBy"});
  users.hasMany(journalentries, { as: "journalentries", foreignKey: "createdBy"});
  purchaseorders.belongsTo(users, { as: "createdBy_user", foreignKey: "createdBy"});
  users.hasMany(purchaseorders, { as: "purchaseorders", foreignKey: "createdBy"});
  reporttemplates.belongsTo(users, { as: "createdBy_user", foreignKey: "createdBy"});
  users.hasMany(reporttemplates, { as: "reporttemplates", foreignKey: "createdBy"});
  salesorders.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(salesorders, { as: "salesorders", foreignKey: "userId"});
  suppliers.belongsTo(users, { as: "createdBy_user", foreignKey: "createdBy"});
  users.hasMany(suppliers, { as: "suppliers", foreignKey: "createdBy"});
  suppliers.belongsTo(users, { as: "updatedBy_user", foreignKey: "updatedBy"});
  users.hasMany(suppliers, { as: "updatedBy_suppliers", foreignKey: "updatedBy"});
  userpermissions.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userpermissions, { as: "userpermissions", foreignKey: "userId"});
  userroles.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userroles, { as: "userroles", foreignKey: "userId"});
  inventory.belongsTo(warehouses, { as: "warehouse", foreignKey: "warehouseId"});
  warehouses.hasMany(inventory, { as: "inventories", foreignKey: "warehouseId"});
  purchaseorderlines.belongsTo(warehouses, { as: "warehouse", foreignKey: "warehouseId"});
  warehouses.hasMany(purchaseorderlines, { as: "purchaseorderlines", foreignKey: "warehouseId"});
  salesorderlines.belongsTo(warehouses, { as: "warehouse", foreignKey: "warehouseId"});
  warehouses.hasMany(salesorderlines, { as: "salesorderlines", foreignKey: "warehouseId"});

  return {
    accountingperiods,
    auditlogs,
    chartofaccounts,
    clientcontacts,
    clients,
    companyinfo,
    departments,
    discounts,
    employees,
    fiscalyears,
    fixedassets,
    goodsreceiptlines,
    goodsreceipts,
    inventory,
    invoices,
    journalentries,
    journallines,
    paymentmethods,
    payments,
    payrollperiods,
    payrolls,
    permissions,
    productcategories,
    productprices,
    products,
    purchaseorderlines,
    purchaseorders,
    reporttemplates,
    returnlines,
    returns,
    roles,
    salesorderdiscounts,
    salesorderlines,
    salesorders,
    scheduledreports,
    statuses,
    suppliercategories,
    suppliercontacts,
    supplierinvoicelines,
    supplierinvoices,
    suppliers,
    systemsettings,
    taxcodes,
    units,
    userpermissions,
    userroles,
    users,
    warehouses,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
