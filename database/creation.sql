DROP DATABASE IF EXISTS core;
CREATE DATABASE core CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE core;

-- Table: users
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the user',
  `username` VARCHAR(100) NOT NULL UNIQUE COMMENT 'User login username',
  `email` VARCHAR(150) NOT NULL UNIQUE COMMENT 'User email address',
  `passwordHash` VARCHAR(255) NOT NULL COMMENT 'Hashed password for authentication',
  `phone` VARCHAR(30) NULL COMMENT 'Optional contact phone number',
  `firstName` VARCHAR(100) NULL COMMENT 'First name of the user',
  `lastName` VARCHAR(100) NULL COMMENT 'Last name of the user',
  `address1` VARCHAR(255) NULL COMMENT 'Primary address line',
  `address2` VARCHAR(255) NULL COMMENT 'Secondary address line',
  `city` VARCHAR(100) NULL COMMENT 'City name',
  `state` VARCHAR(100) NULL COMMENT 'State or province name',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='System users with authentication and contact info';

-- Table: roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for role',
  `roleName` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Role name',
  `description` VARCHAR(255) NULL COMMENT 'Role description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='User roles defining access levels';

-- Table: permissions
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for permission',
  `permissionName` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Permission name',
  `description` VARCHAR(255) NULL COMMENT 'Permission description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='System permissions assignable to users or roles';

-- Table: userPermissions
DROP TABLE IF EXISTS `userPermissions`;
CREATE TABLE `userPermissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for user permission record',
  `userId` INT NOT NULL COMMENT 'User ID',
  `permissionId` INT NOT NULL COMMENT 'Permission ID',
  `granted` BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Permission granted flag',
  `assignedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Assignment timestamp',
  UNIQUE KEY `uniq_user_permission` (`userId`, `permissionId`)
) COMMENT='Direct permissions assigned to users';

-- Table: userRoles
DROP TABLE IF EXISTS `userRoles`;
CREATE TABLE `userRoles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for user role record',
  `userId` INT NOT NULL COMMENT 'User ID',
  `roleId` INT NOT NULL COMMENT 'Role ID',
  `assignedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Assignment timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  UNIQUE KEY `uniq_user_role` (`userId`, `roleId`)
) COMMENT='Roles assigned to users';

-- Table: statuses
DROP TABLE IF EXISTS `statuses`;
CREATE TABLE `statuses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for status',
  `statusName` VARCHAR(100) NOT NULL COMMENT 'Status name',
  `description` VARCHAR(255) NULL COMMENT 'Status description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='System statuses';

-- Table: clients
DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for client',
  `name` VARCHAR(150) NOT NULL COMMENT 'Client name',
  `contactName` VARCHAR(150) NULL COMMENT 'Client primary contact',
  `email` VARCHAR(150) NULL COMMENT 'Client email',
  `phone` VARCHAR(20) NULL COMMENT 'Client phone',
  `address1` VARCHAR(255) NULL COMMENT 'Address line 1',
  `address2` VARCHAR(255) NULL COMMENT 'Address line 2',
  `city` VARCHAR(100) NULL COMMENT 'City name',
  `state` VARCHAR(100) NULL COMMENT 'State or province name',
  `statusId` INT NOT NULL COMMENT 'Client status ID',
  `createdBy` INT NULL COMMENT 'User who created',
  `updatedBy` INT NULL COMMENT 'User who updated',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  INDEX `idx_status_id` (`statusId`)
) COMMENT='Clients and customers';

-- Table: clientContacts
DROP TABLE IF EXISTS `clientContacts`;
CREATE TABLE `clientContacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for client contact',
  `clientId` INT NOT NULL COMMENT 'Client ID',
  `contactName` VARCHAR(150) NOT NULL COMMENT 'Contact person name',
  `email` VARCHAR(150) NULL COMMENT 'Contact email',
  `phone` VARCHAR(20) NULL COMMENT 'Contact phone',
  `position` VARCHAR(100) NULL COMMENT 'Contact position',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Contacts for clients';

-- Table: supplierCategories
DROP TABLE IF EXISTS `supplierCategories`;
CREATE TABLE `supplierCategories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for supplier category',
  `categoryName` VARCHAR(100) NOT NULL COMMENT 'Category name',
  `description` VARCHAR(255) NULL COMMENT 'Category description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Supplier categories';

-- Table: suppliers
DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for supplier',
  `name` VARCHAR(150) NOT NULL COMMENT 'Supplier name',
  `contactName` VARCHAR(150) NULL COMMENT 'Primary contact',
  `email` VARCHAR(150) NULL COMMENT 'Supplier email',
  `phone` VARCHAR(20) NULL COMMENT 'Supplier phone',
  `address1` VARCHAR(255) NULL COMMENT 'Address line 1',
  `address2` VARCHAR(255) NULL COMMENT 'Address line 2',
  `city` VARCHAR(100) NULL COMMENT 'City name',
  `state` VARCHAR(100) NULL COMMENT 'State or province name',
  `categoryId` INT NULL COMMENT 'Supplier category ID',
  `paymentTerms` VARCHAR(100) NULL COMMENT 'Payment terms',
  `createdBy` INT NULL COMMENT 'User who created',
  `updatedBy` INT NULL COMMENT 'User who updated',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  INDEX `idx_category` (`categoryId`)
) COMMENT='Suppliers';

-- Table: supplierContacts
DROP TABLE IF EXISTS `supplierContacts`;
CREATE TABLE `supplierContacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for supplier contact',
  `supplierId` INT NOT NULL COMMENT 'Supplier ID',
  `contactName` VARCHAR(150) NOT NULL COMMENT 'Contact name',
  `email` VARCHAR(150) NULL COMMENT 'Contact email',
  `phone` VARCHAR(20) NULL COMMENT 'Contact phone',
  `position` VARCHAR(100) NULL COMMENT 'Contact position',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Supplier contacts';

-- Table: productCategories
DROP TABLE IF EXISTS `productCategories`;
CREATE TABLE `productCategories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for product category',
  `categoryName` VARCHAR(100) NOT NULL COMMENT 'Category name',
  `description` VARCHAR(255) NULL COMMENT 'Category description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Product categories';

-- Table: units
DROP TABLE IF EXISTS `units`;
CREATE TABLE `units` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for unit of measurement',
  `unitName` VARCHAR(100) NOT NULL COMMENT 'Name of the unit e.g., piece, kilogram, liter',
  `abbreviation` VARCHAR(20) NULL COMMENT 'Abbreviation e.g., pc, kg, l',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Units of measurement for products and inventory';

-- Table: products
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for product',
  `name` VARCHAR(150) NOT NULL COMMENT 'Product name',
  `description` VARCHAR(255) NULL COMMENT 'Product description',
  `standardPrice` DECIMAL(15,2) NOT NULL COMMENT 'Default price',
  `categoryId` INT NULL COMMENT 'Product category ID',
  `unitId` INT NULL COMMENT 'Unit of measure ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Products catalog';

-- Table: productPrices
DROP TABLE IF EXISTS `productPrices`;
CREATE TABLE `productPrices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for product price record',
  `productId` INT NOT NULL COMMENT 'Product ID',
  `clientId` INT NULL COMMENT 'Client ID (null means default price)',
  `price` DECIMAL(15,2) NOT NULL COMMENT 'Price',
  `validFrom` DATE NOT NULL DEFAULT '2000-01-01' COMMENT 'Start of validity',
  `validTo` DATE NOT NULL DEFAULT '2999-12-31' COMMENT 'End of validity',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  UNIQUE KEY `uniq_product_client_validity` (`productId`, `clientId`, `validFrom`, `validTo`)
) COMMENT='Client-specific product prices with validity';

-- Table: warehouses
DROP TABLE IF EXISTS `warehouses`;
CREATE TABLE `warehouses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for warehouse',
  `name` VARCHAR(150) NOT NULL COMMENT 'Warehouse name',
  `address1` VARCHAR(255) NULL COMMENT 'Address line 1',
  `address2` VARCHAR(255) NULL COMMENT 'Address line 2',
  `city` VARCHAR(100) NULL COMMENT 'City name',
  `state` VARCHAR(100) NULL COMMENT 'State or province name',
  `phone` VARCHAR(20) NULL COMMENT 'Contact phone',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Warehouses for inventory storage';

-- Table: inventory
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique inventory record',
  `productId` INT NOT NULL COMMENT 'Product ID',
  `warehouseId` INT NOT NULL COMMENT 'Warehouse ID',
  `quantity` DECIMAL(15,3) NOT NULL DEFAULT 0 COMMENT 'Quantity available',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  INDEX `idx_product_id` (`productId`),
  INDEX `idx_warehouse_id` (`warehouseId`)
) COMMENT='Inventory quantities per warehouse';

-- Table: discounts
DROP TABLE IF EXISTS `discounts`;
CREATE TABLE `discounts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique discount ID',
  `code` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Discount code',
  `description` VARCHAR(255) NULL COMMENT 'Description of discount',
  `discountType` VARCHAR(50) NOT NULL COMMENT 'Type of discount e.g. percentage, fixed_amount',
  `value` DECIMAL(15,2) NOT NULL COMMENT 'Discount value',
  `validFrom` DATE NULL COMMENT 'Discount validity start date',
  `validTo` DATE NULL COMMENT 'Discount validity end date',
  `usageLimit` INT NULL COMMENT 'Maximum times discount can be used',
  `timesUsed` INT NOT NULL DEFAULT 0 COMMENT 'Times discount has been used',
  `active` BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'If discount is active',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  INDEX `idx_code` (`code`)
) COMMENT='Discount codes available in the system';

-- Table: paymentMethods
DROP TABLE IF EXISTS `paymentMethods`;
CREATE TABLE `paymentMethods` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for payment method',
  `methodName` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Name of the payment method, e.g. Cash, Credit Card',
  `description` VARCHAR(255) NULL COMMENT 'Optional description of the payment method',
  `active` BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Indicates if the payment method is active',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Payment methods available in the system';

-- Table: salesOrders
DROP TABLE IF EXISTS `salesOrders`;
CREATE TABLE `salesOrders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the sales order',
  `clientId` INT NOT NULL COMMENT 'Client ID',
  `userId` INT NOT NULL COMMENT 'User ID (salesperson)',
  `orderDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Order date',
  `statusId` INT NOT NULL COMMENT 'Status ID',
  `total` DECIMAL(15,2) NOT NULL COMMENT 'Total amount',
  `tax` DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Tax amount',
  `discount` DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Discount amount',
  `fiscalYearId` INT NOT NULL COMMENT 'Fiscal year ID',
  `accountingPeriodId` INT NOT NULL COMMENT 'Accounting period ID',
  `journalEntryId` INT NULL COMMENT 'Journal entry ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  INDEX `idx_status_id` (`statusId`)
) COMMENT='Sales orders';

-- Table: salesOrderLines
DROP TABLE IF EXISTS `salesOrderLines`;
CREATE TABLE `salesOrderLines` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique sales order line ID',
  `salesOrderId` INT NOT NULL COMMENT 'Sales order ID',
  `productId` INT NOT NULL COMMENT 'Product ID',
  `quantity` DECIMAL(15,3) NOT NULL COMMENT 'Quantity ordered',
  `unitPrice` DECIMAL(15,2) NOT NULL COMMENT 'Unit price',
  `discount` DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Discount',
  `total` DECIMAL(15,2) NOT NULL COMMENT 'Total line amount',
  `warehouseId` INT NOT NULL COMMENT 'Warehouse ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Lines of sales orders';

-- Table: salesOrderDiscounts
DROP TABLE IF EXISTS `salesOrderDiscounts`;
CREATE TABLE `salesOrderDiscounts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique ID for sales order discount record',
  `salesOrderId` INT NOT NULL COMMENT 'Sales order ID',
  `discountId` INT NOT NULL COMMENT 'Discount ID',
  `appliedAmount` DECIMAL(15,2) NOT NULL COMMENT 'Amount of discount applied',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  UNIQUE KEY `uniq_sales_order_discount` (`salesOrderId`, `discountId`)
) COMMENT='Mapping discounts applied to sales orders';

-- Table: payments
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique payment ID',
  `salesOrderId` INT NOT NULL COMMENT 'Sales order ID',
  `paymentMethodId` INT NOT NULL COMMENT 'Payment method ID',
  `amount` DECIMAL(15,2) NOT NULL COMMENT 'Payment amount',
  `paymentDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date of payment',
  `transactionRef` VARCHAR(100) NULL COMMENT 'Transaction reference',
  `fiscalYearId` INT NOT NULL COMMENT 'Fiscal year ID',
  `accountingPeriodId` INT NOT NULL COMMENT 'Accounting period ID',
  `journalEntryId` INT NULL COMMENT 'Journal entry ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  INDEX `idx_payment_method_id` (`paymentMethodId`)
) COMMENT='Payments for sales orders';

-- Table: returns
DROP TABLE IF EXISTS `returns`;
CREATE TABLE `returns` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Return ID',
  `salesOrderId` INT NOT NULL COMMENT 'Sales order ID',
  `returnDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Return date',
  `reason` VARCHAR(255) NULL COMMENT 'Reason for return',
  `total` DECIMAL(15,2) NULL COMMENT 'Return total',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Returns for sales orders';

-- Table: returnLines
DROP TABLE IF EXISTS `returnLines`;
CREATE TABLE `returnLines` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Return line ID',
  `returnId` INT NOT NULL COMMENT 'Return ID',
  `productId` INT NOT NULL COMMENT 'Product ID',
  `quantity` DECIMAL(15,3) NOT NULL COMMENT 'Returned quantity',
  `unitPrice` DECIMAL(15,2) NOT NULL COMMENT 'Unit price',
  `total` DECIMAL(15,2) NULL COMMENT 'Total amount',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Details of returned items';

-- Table: invoices
DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the invoice',
  `salesOrderId` INT NOT NULL COMMENT 'Related sales order ID',
  `invoiceCode` VARCHAR(100) NULL COMMENT 'Invoice code',
  `invoiceNumber` INT NULL COMMENT 'Invoice number',
  `invoiceDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Invoice issue date',
  `statusId` INT NOT NULL COMMENT 'Status ID',
  `retention` DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Retention amount',
  `total` DECIMAL(15,2) NOT NULL COMMENT 'Total invoice amount',
  `isPaid` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Paid status',
  `fiscalYearId` INT NOT NULL COMMENT 'Fiscal year ID',
  `accountingPeriodId` INT NOT NULL COMMENT 'Accounting period ID',
  `journalEntryId` INT NULL COMMENT 'Linked journal entry ID',
  `detail` VARCHAR(255) NULL COMMENT 'Additional details',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Invoices generated for sales orders';

-- Table: purchaseOrders
DROP TABLE IF EXISTS `purchaseOrders`;
CREATE TABLE `purchaseOrders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the purchase order',
  `supplierId` INT NOT NULL COMMENT 'Supplier ID',
  `orderNumber` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Unique order number',
  `orderDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Order date',
  `expectedDeliveryDate` DATE NULL COMMENT 'Expected delivery date',
  `statusId` INT NOT NULL COMMENT 'Status ID',
  `total` DECIMAL(15,2) NOT NULL COMMENT 'Total amount',
  `createdBy` INT NOT NULL COMMENT 'User who created order',
  `fiscalYearId` INT NOT NULL COMMENT 'Fiscal year ID',
  `accountingPeriodId` INT NOT NULL COMMENT 'Accounting period ID',
  `journalEntryId` INT NULL COMMENT 'Journal entry ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  INDEX `idx_status_id` (`statusId`)
) COMMENT='Purchase orders';

-- Table: purchaseOrderLines
DROP TABLE IF EXISTS `purchaseOrderLines`;
CREATE TABLE `purchaseOrderLines` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Purchase order line ID',
  `purchaseOrderId` INT NOT NULL COMMENT 'Purchase order ID',
  `productId` INT NOT NULL COMMENT 'Product ID',
  `quantityOrdered` DECIMAL(15,3) NOT NULL COMMENT 'Quantity ordered',
  `quantityReceived` DECIMAL(15,3) NOT NULL DEFAULT 0 COMMENT 'Quantity received',
  `unitPrice` DECIMAL(15,2) NOT NULL COMMENT 'Unit price',
  `total` DECIMAL(15,2) NOT NULL COMMENT 'Total line amount',
  `warehouseId` INT NOT NULL COMMENT 'Warehouse ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Purchase order lines';

-- Table: goodsReceipts
DROP TABLE IF EXISTS `goodsReceipts`;
CREATE TABLE `goodsReceipts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Goods receipt ID',
  `purchaseOrderId` INT NOT NULL COMMENT 'Purchase order ID',
  `receiptDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Receipt date',
  `receivedBy` INT NOT NULL COMMENT 'User who received goods',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Goods receipt records';

-- Table: goodsReceiptLines
DROP TABLE IF EXISTS `goodsReceiptLines`;
CREATE TABLE `goodsReceiptLines` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Goods receipt line ID',
  `goodsReceiptId` INT NOT NULL COMMENT 'Goods receipt ID',
  `purchaseOrderLineId` INT NOT NULL COMMENT 'Purchase order line ID',
  `quantityReceived` DECIMAL(15,3) NOT NULL COMMENT 'Quantity received',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Lines for goods receipts';

-- Table: supplierInvoices
DROP TABLE IF EXISTS `supplierInvoices`;
CREATE TABLE `supplierInvoices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Supplier invoice ID',
  `purchaseOrderId` INT NOT NULL COMMENT 'Purchase order ID',
  `invoiceNumber` VARCHAR(50) NOT NULL COMMENT 'Invoice number',
  `invoiceDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Invoice date',
  `total` DECIMAL(15,2) NOT NULL COMMENT 'Total invoice amount',
  `tax` DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Tax amount',
  `retention` DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Retention amount',
  `statusId` INT NOT NULL COMMENT 'Status ID',
  `isPaid` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Paid flag',
  `fiscalYearId` INT NOT NULL COMMENT 'Fiscal year ID',
  `accountingPeriodId` INT NOT NULL COMMENT 'Accounting period ID',
  `journalEntryId` INT NULL COMMENT 'Journal entry ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  INDEX `idx_status_id` (`statusId`)
) COMMENT='Supplier invoices';

-- Table: supplierInvoiceLines
DROP TABLE IF EXISTS `supplierInvoiceLines`;
CREATE TABLE `supplierInvoiceLines` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Supplier invoice line ID',
  `supplierInvoiceId` INT NOT NULL COMMENT 'Supplier invoice ID',
  `purchaseOrderLineId` INT NOT NULL COMMENT 'Purchase order line ID',
  `quantityInvoiced` DECIMAL(15,3) NOT NULL COMMENT 'Quantity invoiced',
  `unitPrice` DECIMAL(15,2) NOT NULL COMMENT 'Unit price',
  `total` DECIMAL(15,2) NOT NULL COMMENT 'Line total',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Lines for supplier invoices';

-- Table: fixedAssets
DROP TABLE IF EXISTS `fixedAssets`;
CREATE TABLE `fixedAssets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the fixed asset',
  `assetTag` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Unique asset tag or serial number',
  `description` VARCHAR(255) NULL COMMENT 'Description of the asset',
  `purchaseDate` DATE NULL COMMENT 'Date asset was purchased',
  `purchasePrice` DECIMAL(15, 2) NULL COMMENT 'Purchase price of the asset',
  `accumulatedDepreciation` DECIMAL(15, 2) NOT NULL DEFAULT 0 COMMENT 'Accumulated depreciation amount',
  `usefulLifeMonths` INT NULL COMMENT 'Useful life in months for depreciation',
  `depreciationMethod` VARCHAR(50) NULL COMMENT 'Method used for depreciation, e.g., straight-line',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Fixed assets and depreciation tracking';

-- Table: chartOfAccounts
DROP TABLE IF EXISTS `chartOfAccounts`;
CREATE TABLE `chartOfAccounts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the account',
  `accountCode` VARCHAR(20) NOT NULL UNIQUE COMMENT 'Account code e.g., 1000, 2000-01',
  `accountName` VARCHAR(150) NOT NULL COMMENT 'Name of the account',
  `accountType` VARCHAR(50) NOT NULL COMMENT 'Type of account e.g., Asset, Liability, Equity, Revenue, Expense',
  `parentAccountId` INT NULL COMMENT 'Self-reference for hierarchical accounts',
  `description` VARCHAR(255) NULL COMMENT 'Account description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Chart of accounts for ledger';

-- Table: fiscalYears
DROP TABLE IF EXISTS `fiscalYears`;
CREATE TABLE `fiscalYears` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for fiscal year',
  `year` INT NOT NULL UNIQUE COMMENT 'Calendar year',
  `startDate` DATE NOT NULL COMMENT 'Fiscal year start date',
  `endDate` DATE NOT NULL COMMENT 'Fiscal year end date',
  `isClosed` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Flag if fiscal year is closed',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp'
) COMMENT='Fiscal years';

-- Table: accountingPeriods
DROP TABLE IF EXISTS `accountingPeriods`;
CREATE TABLE `accountingPeriods` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for accounting period',
  `fiscalYearId` INT NOT NULL COMMENT 'Fiscal year ID',
  `periodNumber` INT NOT NULL COMMENT 'Period number (1=January, etc.)',
  `startDate` DATE NOT NULL COMMENT 'Period start date',
  `endDate` DATE NOT NULL COMMENT 'Period end date',
  `isClosed` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Flag if period is closed',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  UNIQUE KEY `uniq_fiscal_year_period` (`fiscalYearId`, `periodNumber`)
) COMMENT='Accounting periods';

-- Table: journalEntries
DROP TABLE IF EXISTS `journalEntries`;
CREATE TABLE `journalEntries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for journal entry',
  `entryDate` DATE NOT NULL COMMENT 'Entry date',
  `description` VARCHAR(255) NULL COMMENT 'Entry description',
  `accountingPeriodId` INT NOT NULL COMMENT 'Accounting period ID',
  `fiscalYearId` INT NOT NULL COMMENT 'Fiscal year ID',
  `reference` VARCHAR(100) NULL COMMENT 'Reference (invoice, PO, etc.)',
  `createdBy` INT NOT NULL COMMENT 'User who created the entry',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Journal entries for accounting';

-- Table: journalLines
DROP TABLE IF EXISTS `journalLines`;
CREATE TABLE `journalLines` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for journal line',
  `journalEntryId` INT NOT NULL COMMENT 'Journal entry ID',
  `accountId` INT NOT NULL COMMENT 'Account ID',
  `debit` DECIMAL(18, 2) NOT NULL DEFAULT 0 COMMENT 'Debit amount',
  `credit` DECIMAL(18, 2) NOT NULL DEFAULT 0 COMMENT 'Credit amount',
  `description` VARCHAR(255) NULL COMMENT 'Line description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Journal entry lines';

-- Table: taxCodes
DROP TABLE IF EXISTS `taxCodes`;
CREATE TABLE `taxCodes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique tax code ID',
  `code` VARCHAR(10) NOT NULL UNIQUE COMMENT 'Tax code, e.g., VAT, GST',
  `description` VARCHAR(255) NULL COMMENT 'Tax description',
  `rate` DECIMAL(5, 2) NOT NULL COMMENT 'Tax rate percentage',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Tax codes';

-- Table: departments
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for department',
  `name` VARCHAR(150) NOT NULL COMMENT 'Department name',
  `description` VARCHAR(255) NULL COMMENT 'Department description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Departments within the organization';

-- Table: employees
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for employee',
  `firstName` VARCHAR(100) NOT NULL COMMENT 'Employee first name',
  `secondName` VARCHAR(100) NULL COMMENT 'Employee second name',
  `lastName` VARCHAR(100) NOT NULL COMMENT 'Employee last name',
  `secondLastName` VARCHAR(100) NULL COMMENT 'Employee second last name',
  `email` VARCHAR(150) NULL COMMENT 'Employee email address',
  `phone` VARCHAR(20) NULL COMMENT 'Employee phone number',
  `address1` VARCHAR(255) NULL COMMENT 'Address line 1',
  `address2` VARCHAR(255) NULL COMMENT 'Address line 2',
  `city` VARCHAR(100) NULL COMMENT 'City name',
  `state` VARCHAR(100) NULL COMMENT 'State or province name',
  `dateOfBirth` DATE NULL COMMENT 'Date of birth',
  `hireDate` DATE NULL COMMENT 'Hire date',
  `terminationDate` DATE NULL COMMENT 'Termination date',
  `departmentId` INT NULL COMMENT 'Department ID',
  `jobTitle` VARCHAR(150) NULL COMMENT 'Job title',
  `statusId` INT NOT NULL COMMENT 'Status ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag',
  INDEX `idx_status_id` (`statusId`)
) COMMENT='Employees information';

-- Table: payrollPeriods
DROP TABLE IF EXISTS `payrollPeriods`;
CREATE TABLE `payrollPeriods` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique payroll period ID',
  `startDate` DATE NOT NULL COMMENT 'Period start date',
  `endDate` DATE NOT NULL COMMENT 'Period end date',
  `statusId` INT NOT NULL COMMENT 'Status ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  INDEX `idx_status_id` (`statusId`)
) COMMENT='Payroll periods';

-- Table: payrolls
DROP TABLE IF EXISTS `payrolls`;
CREATE TABLE `payrolls` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique payroll record ID',
  `employeeId` INT NOT NULL COMMENT 'Employee ID',
  `payrollPeriodId` INT NOT NULL COMMENT 'Payroll period ID',
  `grossSalary` DECIMAL(15,2) NOT NULL COMMENT 'Gross salary',
  `deductions` DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Deductions',
  `netSalary` DECIMAL(15,2) NOT NULL COMMENT 'Net salary',
  `taxes` DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Taxes withheld',
  `paymentDate` DATE NULL COMMENT 'Payment date',
  `paymentMethodId` INT NULL COMMENT 'Payment method ID',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Employee payroll records';

-- Table: companyInfo
DROP TABLE IF EXISTS `companyInfo`;
CREATE TABLE `companyInfo` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique company info ID',
  `companyName` VARCHAR(150) NOT NULL COMMENT 'Company name',
  `taxId` VARCHAR(50) NULL COMMENT 'Tax ID',
  `address1` VARCHAR(255) NULL COMMENT 'Address line 1',
  `address2` VARCHAR(255) NULL COMMENT 'Address line 2',
  `city` VARCHAR(100) NULL COMMENT 'City name',
  `state` VARCHAR(100) NULL COMMENT 'State or province name',
  `phone` VARCHAR(20) NULL COMMENT 'Phone number',
  `email` VARCHAR(150) NULL COMMENT 'Email address',
  `website` VARCHAR(255) NULL COMMENT 'Website URL',
  `fiscalYearStartMonth` INT NOT NULL DEFAULT 1 COMMENT 'Fiscal year start month (1=January)',
  `timezone` VARCHAR(100) NOT NULL DEFAULT 'UTC' COMMENT 'System timezone',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Company general information';

-- Table: systemSettings
DROP TABLE IF EXISTS `systemSettings`;
CREATE TABLE `systemSettings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique system setting ID',
  `settingKey` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Setting key',
  `settingValue` VARCHAR(255) NOT NULL COMMENT 'Setting value',
  `description` VARCHAR(255) NULL COMMENT 'Setting description',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp'
) COMMENT='Generic system settings';

-- Table: auditLogs
DROP TABLE IF EXISTS `auditLogs`;
CREATE TABLE `auditLogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique audit log ID',
  `userId` INT NULL COMMENT 'User ID who performed action (nullable for system)',
  `entityName` VARCHAR(100) NOT NULL COMMENT 'Affected entity/table',
  `entityId` INT NOT NULL COMMENT 'ID of the affected record',
  `action` VARCHAR(50) NOT NULL COMMENT 'Action performed',
  `changes` JSON NULL COMMENT 'JSON with old/new values',
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Action timestamp',
  `ipAddress` VARCHAR(45) NULL COMMENT 'IP address of actor'
) COMMENT='Audit log of system actions';

-- Table: reportTemplates
DROP TABLE IF EXISTS `reportTemplates`;
CREATE TABLE `reportTemplates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Report template ID',
  `name` VARCHAR(150) NOT NULL COMMENT 'Template name',
  `description` VARCHAR(255) NULL COMMENT 'Template description',
  `templateDefinition` TEXT NOT NULL COMMENT 'Report template definition (JSON/SQL/XML)',
  `createdBy` INT NULL COMMENT 'User ID creator',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Report templates';

-- Table: scheduledReports
DROP TABLE IF EXISTS `scheduledReports`;
CREATE TABLE `scheduledReports` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Scheduled report ID',
  `reportTemplateId` INT NOT NULL COMMENT 'Report template ID',
  `scheduleCron` VARCHAR(100) NOT NULL COMMENT 'Cron schedule expression',
  `lastRun` TIMESTAMP NULL DEFAULT NULL COMMENT 'Last execution time',
  `nextRun` TIMESTAMP NULL DEFAULT NULL COMMENT 'Next execution time',
  `recipients` TEXT NULL COMMENT 'Recipients list (JSON array)',
  `active` BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Active flag',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update timestamp',
  `deletedAt` TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Soft delete flag'
) COMMENT='Scheduled automated reports';

-- Add foreign key constraints after all tables are created
-- Users
ALTER TABLE `userPermissions`
  ADD CONSTRAINT `fk_user_permissions_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
  ADD CONSTRAINT `fk_user_permissions_permission` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`);

ALTER TABLE `userRoles`
  ADD CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
  ADD CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`);

-- Clients
ALTER TABLE `clients`
  ADD CONSTRAINT `fk_clients_status` FOREIGN KEY (`statusId`) REFERENCES `statuses`(`id`),
  ADD CONSTRAINT `fk_clients_created_by` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`),
  ADD CONSTRAINT `fk_clients_updated_by` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`);

ALTER TABLE `clientContacts`
  ADD CONSTRAINT `fk_client_contacts_client` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`);

-- Suppliers
ALTER TABLE `suppliers`
  ADD CONSTRAINT `fk_suppliers_category` FOREIGN KEY (`categoryId`) REFERENCES `supplierCategories`(`id`),
  ADD CONSTRAINT `fk_suppliers_created_by` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`),
  ADD CONSTRAINT `fk_suppliers_updated_by` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`);

ALTER TABLE `supplierContacts`
  ADD CONSTRAINT `fk_supplier_contacts_supplier` FOREIGN KEY (`supplierId`) REFERENCES `suppliers`(`id`);

-- Products and related
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`categoryId`) REFERENCES `productCategories`(`id`),
  ADD CONSTRAINT `fk_products_unit` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`);

ALTER TABLE `productPrices`
  ADD CONSTRAINT `fk_product_prices_product` FOREIGN KEY (`productId`) REFERENCES `products`(`id`),
  ADD CONSTRAINT `fk_product_prices_client` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`);

-- Inventory
ALTER TABLE `inventory`
  ADD CONSTRAINT `fk_inventory_product` FOREIGN KEY (`productId`) REFERENCES `products`(`id`),
  ADD CONSTRAINT `fk_inventory_warehouse` FOREIGN KEY (`warehouseId`) REFERENCES `warehouses`(`id`);

-- Sales & POS
ALTER TABLE `salesOrders`
  ADD CONSTRAINT `fk_sales_orders_client` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`),
  ADD CONSTRAINT `fk_sales_orders_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
  ADD CONSTRAINT `fk_sales_orders_status` FOREIGN KEY (`statusId`) REFERENCES `statuses`(`id`),
  ADD CONSTRAINT `fk_sales_orders_fiscal_year` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalYears`(`id`),
  ADD CONSTRAINT `fk_sales_orders_accounting_period` FOREIGN KEY (`accountingPeriodId`) REFERENCES `accountingPeriods`(`id`),
  ADD CONSTRAINT `fk_sales_orders_journal_entry` FOREIGN KEY (`journalEntryId`) REFERENCES `journalEntries`(`id`);

ALTER TABLE `salesOrderLines`
  ADD CONSTRAINT `fk_sales_order_lines_sales_order` FOREIGN KEY (`salesOrderId`) REFERENCES `salesOrders`(`id`),
  ADD CONSTRAINT `fk_sales_order_lines_product` FOREIGN KEY (`productId`) REFERENCES `products`(`id`),
  ADD CONSTRAINT `fk_sales_order_lines_warehouse` FOREIGN KEY (`warehouseId`) REFERENCES `warehouses`(`id`);

ALTER TABLE `salesOrderDiscounts`
  ADD CONSTRAINT `fk_sales_order_discounts_sales_order` FOREIGN KEY (`salesOrderId`) REFERENCES `salesOrders`(`id`),
  ADD CONSTRAINT `fk_sales_order_discounts_discount` FOREIGN KEY (`discountId`) REFERENCES `discounts`(`id`);

ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_sales_order` FOREIGN KEY (`salesOrderId`) REFERENCES `salesOrders`(`id`),
  ADD CONSTRAINT `fk_payments_payment_method` FOREIGN KEY (`paymentMethodId`) REFERENCES `paymentMethods`(`id`),
  ADD CONSTRAINT `fk_payments_fiscal_year` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalYears`(`id`),
  ADD CONSTRAINT `fk_payments_accounting_period` FOREIGN KEY (`accountingPeriodId`) REFERENCES `accountingPeriods`(`id`),
  ADD CONSTRAINT `fk_payments_journal_entry` FOREIGN KEY (`journalEntryId`) REFERENCES `journalEntries`(`id`);

ALTER TABLE `returns`
  ADD CONSTRAINT `fk_returns_sales_order` FOREIGN KEY (`salesOrderId`) REFERENCES `salesOrders`(`id`);

ALTER TABLE `returnLines`
  ADD CONSTRAINT `fk_return_lines_return` FOREIGN KEY (`returnId`) REFERENCES `returns`(`id`),
  ADD CONSTRAINT `fk_return_lines_product` FOREIGN KEY (`productId`) REFERENCES `products`(`id`);

ALTER TABLE `invoices`
  ADD CONSTRAINT `fk_invoices_sales_order` FOREIGN KEY (`salesOrderId`) REFERENCES `salesOrders`(`id`),
  ADD CONSTRAINT `fk_invoices_status` FOREIGN KEY (`statusId`) REFERENCES `statuses`(`id`),
  ADD CONSTRAINT `fk_invoices_fiscal_year` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalYears`(`id`),
  ADD CONSTRAINT `fk_invoices_accounting_period` FOREIGN KEY (`accountingPeriodId`) REFERENCES `accountingPeriods`(`id`),
  ADD CONSTRAINT `fk_invoices_journal_entry` FOREIGN KEY (`journalEntryId`) REFERENCES `journalEntries`(`id`);

-- Purchasing
ALTER TABLE `purchaseOrders`
  ADD CONSTRAINT `fk_purchase_orders_supplier` FOREIGN KEY (`supplierId`) REFERENCES `suppliers`(`id`),
  ADD CONSTRAINT `fk_purchase_orders_status` FOREIGN KEY (`statusId`) REFERENCES `statuses`(`id`),
  ADD CONSTRAINT `fk_purchase_orders_created_by` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`),
  ADD CONSTRAINT `fk_purchase_orders_fiscal_year` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalYears`(`id`),
  ADD CONSTRAINT `fk_purchase_orders_accounting_period` FOREIGN KEY (`accountingPeriodId`) REFERENCES `accountingPeriods`(`id`),
  ADD CONSTRAINT `fk_purchase_orders_journal_entry` FOREIGN KEY (`journalEntryId`) REFERENCES `journalEntries`(`id`);

ALTER TABLE `purchaseOrderLines`
  ADD CONSTRAINT `fk_purchase_order_lines_purchase_order` FOREIGN KEY (`purchaseOrderId`) REFERENCES `purchaseOrders`(`id`),
  ADD CONSTRAINT `fk_purchase_order_lines_product` FOREIGN KEY (`productId`) REFERENCES `products`(`id`),
  ADD CONSTRAINT `fk_purchase_order_lines_warehouse` FOREIGN KEY (`warehouseId`) REFERENCES `warehouses`(`id`);

ALTER TABLE `goodsReceipts`
  ADD CONSTRAINT `fk_goods_receipts_purchase_order` FOREIGN KEY (`purchaseOrderId`) REFERENCES `purchaseOrders`(`id`),
  ADD CONSTRAINT `fk_goods_receipts_received_by` FOREIGN KEY (`receivedBy`) REFERENCES `users`(`id`);

ALTER TABLE `goodsReceiptLines`
  ADD CONSTRAINT `fk_goods_receipt_lines_goods_receipt` FOREIGN KEY (`goodsReceiptId`) REFERENCES `goodsReceipts`(`id`),
  ADD CONSTRAINT `fk_goods_receipt_lines_purchase_order_line` FOREIGN KEY (`purchaseOrderLineId`) REFERENCES `purchaseOrderLines`(`id`);

ALTER TABLE `supplierInvoices`
  ADD CONSTRAINT `fk_supplier_invoices_purchase_order` FOREIGN KEY (`purchaseOrderId`) REFERENCES `purchaseOrders`(`id`),
  ADD CONSTRAINT `fk_supplier_invoices_status` FOREIGN KEY (`statusId`) REFERENCES `statuses`(`id`),
  ADD CONSTRAINT `fk_supplier_invoices_fiscal_year` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalYears`(`id`),
  ADD CONSTRAINT `fk_supplier_invoices_accounting_period` FOREIGN KEY (`accountingPeriodId`) REFERENCES `accountingPeriods`(`id`),
  ADD CONSTRAINT `fk_supplier_invoices_journal_entry` FOREIGN KEY (`journalEntryId`) REFERENCES `journalEntries`(`id`);

ALTER TABLE `supplierInvoiceLines`
  ADD CONSTRAINT `fk_supplier_invoice_lines_supplier_invoice` FOREIGN KEY (`supplierInvoiceId`) REFERENCES `supplierInvoices`(`id`),
  ADD CONSTRAINT `fk_supplier_invoice_lines_purchase_order_line` FOREIGN KEY (`purchaseOrderLineId`) REFERENCES `purchaseOrderLines`(`id`);

-- General Ledger
ALTER TABLE `chartOfAccounts`
  ADD CONSTRAINT `fk_chart_of_accounts_parent_account` FOREIGN KEY (`parentAccountId`) REFERENCES `chartOfAccounts`(`id`);

ALTER TABLE `accountingPeriods`
  ADD CONSTRAINT `fk_accounting_periods_fiscal_year` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalYears`(`id`);

ALTER TABLE `journalEntries`
  ADD CONSTRAINT `fk_journal_entries_accounting_period` FOREIGN KEY (`accountingPeriodId`) REFERENCES `accountingPeriods`(`id`),
  ADD CONSTRAINT `fk_journal_entries_fiscal_year` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalYears`(`id`),
  ADD CONSTRAINT `fk_journal_entries_created_by` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`);

ALTER TABLE `journalLines`
  ADD CONSTRAINT `fk_journal_lines_journal_entry` FOREIGN KEY (`journalEntryId`) REFERENCES `journalEntries`(`id`),
  ADD CONSTRAINT `fk_journal_lines_account` FOREIGN KEY (`accountId`) REFERENCES `chartOfAccounts`(`id`);

-- Employees and Payroll
ALTER TABLE `employees`
  ADD CONSTRAINT `fk_employees_department` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`),
  ADD CONSTRAINT `fk_employees_status` FOREIGN KEY (`statusId`) REFERENCES `statuses`(`id`);

ALTER TABLE `payrollPeriods`
  ADD CONSTRAINT `fk_payroll_periods_status` FOREIGN KEY (`statusId`) REFERENCES `statuses`(`id`);

ALTER TABLE `payrolls`
  ADD CONSTRAINT `fk_payrolls_employee` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`),
  ADD CONSTRAINT `fk_payrolls_payroll_period` FOREIGN KEY (`payrollPeriodId`) REFERENCES `payrollPeriods`(`id`),
  ADD CONSTRAINT `fk_payrolls_payment_method` FOREIGN KEY (`paymentMethodId`) REFERENCES `paymentMethods`(`id`);

-- Reports and Audit
ALTER TABLE `auditLogs`
  ADD CONSTRAINT `fk_audit_logs_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `reportTemplates`
  ADD CONSTRAINT `fk_report_templates_created_by` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`);

ALTER TABLE `scheduledReports`
  ADD CONSTRAINT `fk_scheduled_reports_report_template` FOREIGN KEY (`reportTemplateId`) REFERENCES `reportTemplates`(`id`);
