using Microsoft.EntityFrameworkCore;

namespace Mic1.Domain
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(localdb)\mssqllocaldb;
                                       Initial Catalog=employeeMic;
                                        Integrated Security=true;
                                       MultipleActiveResultSets=true");
            base.OnConfiguring(optionsBuilder);
        }

    }
}
