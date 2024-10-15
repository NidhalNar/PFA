using System.ComponentModel.DataAnnotations;

namespace Mic1.Domain
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string nom { get; set; }
        public string prenom { get; set; }

        public string email { get; set; }
        public string reference { get; set; }


    }
}
