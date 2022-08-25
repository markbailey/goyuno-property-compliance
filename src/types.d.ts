declare interface ComplianceCheck {
  type: string;
  cost: number;
  checkDate: string;
}

declare interface Property {
  id: number;
  name: string;
  complianceChecks: ComplianceCheck[];
}

declare interface CheckWithProperty extends ComplianceCheck {
  property: string;
}
