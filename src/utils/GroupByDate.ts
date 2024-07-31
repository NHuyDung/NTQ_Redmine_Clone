interface GroupedIssues<T> {
  [date: string]: {
    issues: T[];
    totalHours: number;
  };
}

export const groupIssuesByDate = <T extends { spent_on: string; hours: number }>(issues: T[]): GroupedIssues<T> => {
  return issues.reduce((acc: GroupedIssues<T>, issue: T) => {
    const date = issue.spent_on;
    if (!acc[date]) {
      acc[date] = { issues: [], totalHours: 0 };
    }
    acc[date].issues.push(issue);
    acc[date].totalHours += issue.hours;
    return acc;
  }, {});
};
