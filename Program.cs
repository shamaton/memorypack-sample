using MemoryPack;

var bin = MemoryPackSerializer.Serialize(new TestClass
{
    Id = 100,
    Name = "Hello"
});

var obj = MemoryPackSerializer.Deserialize<TestClass>(bin);

if (obj != null)
    Console.WriteLine($"{obj.Id}:{obj.Name}");

[MemoryPackable]
public partial class TestClass
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
}

[MemoryPackable, GenerateTypeScript]
public partial class WeatherForecast
{
    public DateTime Date { get; set; }
    public int TemperatureC { get; set; }
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
    public string? Summary { get; set; }
}